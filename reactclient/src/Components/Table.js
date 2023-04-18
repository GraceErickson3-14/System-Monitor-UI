import * as React from 'react';
import { useState } from 'react';
import { DataGrid, GridToolbar} from '@mui/x-data-grid';
import { Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';

import { styled } from '@mui/material/styles';

import "./Table.css"
import ColumnMenu from './ColumnMenu';



const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '&.customDataGrid .MuiDataGrid-columnHeaderDraggableContainer': {
      borderRight: 'none',
    },
    '&.customDataGrid .MuiDataGrid-columnHeaderTitleContainerContent': {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  }));

  
 

function Table({ data, onGenerateReport }) {
  const [dateHeaderName, setDateHeaderName] = useState('Date');
  const [selectedDateRange, setSelectedDateRange] = useState('Day');
  const [visibleColumns, setVisibleColumns] = useState(null);
  const [checkedRows, setCheckedRows] = useState(null);
  const [rowData, setRowData]= useState(null);


  function handleDateRangeChange(event) {
    const selectedRange = event.target.value;
    console.log('selected:', selectedRange );
    switch (selectedRange) {
      case 'Day':
        setDateHeaderName('Day');
        setSelectedDateRange("Day");
        break;
      case 'Week':
        setDateHeaderName('Week');
        setSelectedDateRange("Week");
        break;
      case 'Month':
        setDateHeaderName('Month');
        setSelectedDateRange("Month");
        break;
      default:
        setDateHeaderName('Date');
    }
  }

const columns = [

    { field: '_id', headerName: 'IP Address', minWidth: 100, disableColumnMenu: true,sortable: false, hideable: false,valueGetter: (params) => params.row.ipAddress },
    {
      field: 'date',
      headerName: dateHeaderName,
      minWidth: 200,
      disableColumnMenu: true, 
      sortable: false,
      renderHeader: (params) => (
        <div>
          <FormControl style={{width:"180px", marginRight:"3px"}}>
            <InputLabel>Date Range</InputLabel>
            <Select  value={selectedDateRange} onChange={handleDateRangeChange} >

              <MenuItem value="Day">Day</MenuItem>
              <MenuItem value="Week">Week</MenuItem>
              <MenuItem value="Month">Month</MenuItem>
            </Select>
          </FormControl>
        </div>
      ),
    },

  { field: 'cpuUser', headerName: 'User (%)', minWidth: 100, align: 'center', valueGetter: (params) => params.row.cpu.utilization.user },
  { field: 'cpuSystem', headerName: 'System (%)', minWidth: 100, align: 'center', valueGetter: (params) => params.row.cpu.utilization.system },
  { field: 'cpuIdle', headerName: 'Idle (%)', minWidth: 100, align: 'center', valueGetter: (params) => params.row.cpu.utilization.idle },
  { field: 'memoryUsed', headerName: 'Used (GB)', minWidth: 100, align: 'center', valueGetter: (params) => params.row.memory.usage.gigabytesUsed },
  { field: 'availableMemory', headerName: 'Available (GB)', minWidth: 110, align: 'center', valueGetter: (params) => params.row.memory.usage.availableMemory },
  { field: 'diskUsed', headerName: 'Used (%)', minWidth: 100, align: 'center', valueGetter: (params) => params.row.disk.utilization.used },
  { field: 'diskAvailable', headerName: 'Available (%)', minWidth: 110, align: 'center', valueGetter: (params) => params.row.disk.utilization.available },
  { field: 'numberOfOperations', headerName: 'Operations', minWidth: 110, align: 'center', valueGetter: (params) => params.row.disk.numberOfOperations },
  { field: 'diskLatency', headerName: 'Latency (ms)', minWidth: 110, align: 'center', valueGetter: (params) => params.row.disk.latency },

  ];

 
  React.useEffect(() => {
    const initialVisibleColumns = columns.reduce((acc, column) => {
      acc[column.field] = true;
      return acc;
    }, {});
    setVisibleColumns(initialVisibleColumns);
  }, []);

  React.useEffect(() => {
   
    if (rowData !== null) {
    }
  }, [rowData]);

  //this updates row data for checked rows
  function handleRowSelectionModelChange(model, details) {
    const modelArray = Object.values(model);
    const visibleColumnDataForSelectedRows = modelArray.reduce((acc, rowId) => {
      acc[rowId] = getVisibleColumnDataForRow(rowId);
      return acc;
    }, {});
 
    setRowData(visibleColumnDataForSelectedRows);
  
  }

  //this function will update the visibleColumns state which will hold all columns that are not hidden. 
function handleColumnVisibilityChange(model, details) {

  if (typeof model === 'object') {
    setVisibleColumns((prevVisibleColumns) => {
      const updatedVisibleColumns = { ...prevVisibleColumns };
      for (const key in model) {
        if (model.hasOwnProperty(key)) {
          if (model[key]) {
            updatedVisibleColumns[key] = true;
          } else {
            delete updatedVisibleColumns[key];
          }
        }
      }
      return updatedVisibleColumns;
    });
  }
}
//This function returns the data for a passed rowID
function getVisibleColumnDataForRow(rowId) {
  // Find the row with the specified row ID
  const row = data.find((row) => row.ipAddress === rowId);

  if (!row) {
    return {};
  }

  // Create an object with only the visible column data
  const visibleColumnData = {};
  for (const columnField in visibleColumns) {
    if (visibleColumns[columnField] === true) {
      if (columnField === 'cpuUser') {
        visibleColumnData[columnField] = row.cpu.utilization.user;
      } else if (columnField === 'cpuSystem') {
        visibleColumnData[columnField] = row.cpu.utilization.system;
      } else if (columnField === 'cpuIdle') {
        visibleColumnData[columnField] = row.cpu.utilization.idle;
      } else if (columnField === 'memoryUsed') {
        visibleColumnData[columnField] = row.memory.usage.gigabytesUsed;
      } else if (columnField === 'availableMemory') {
        visibleColumnData[columnField] = row.memory.usage.availableMemory;
      } else if (columnField === 'diskUsed') {
        visibleColumnData[columnField] = row.disk.utilization.used;
      } else if (columnField === 'diskAvailable') {
        visibleColumnData[columnField] = row.disk.utilization.available;
      } else if (columnField === 'numberOfOperations') {
        visibleColumnData[columnField] = row.disk.numberOfOperations;
      } else if (columnField === 'diskLatency') {
        visibleColumnData[columnField] = row.disk.latency;
      } else {
        visibleColumnData[columnField] = row[columnField];
      }
    }
  }

  return visibleColumnData;
}


function generateReport() {
 

  const labels = [];
  const data = [];

  for (const ipAddress in rowData) {
    if (rowData.hasOwnProperty(ipAddress)) {
      labels.push(ipAddress);
      const rowDataForIP = rowData[ipAddress];

      // Filter out the date and _id fields
      const rowDataArray = Object.entries(rowDataForIP)
        .filter(([key]) => key !== 'date' && key !== '_id')
        .map(([_, value]) => value);

      data.push(rowDataArray);
    }
  }

  const formattedData = {
    labels: labels,
    data: data,
  };

  if (typeof onGenerateReport === 'function') {
    onGenerateReport(formattedData);
  }
}

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Button onClick={generateReport}>Generate Visual Report</Button>
      <StyledDataGrid  
      rows={data} 
      columns={columns}
      pageSize={5} 
      checkboxSelection 
      sx={{backgroundColor: "white"}} 
      getRowId={(row) => row.ipAddress}
      slots={{
        toolbar: GridToolbar,
      
      }}
      experimentalFeatures={{ columnGrouping: true }}
      columnGroupingModel={[
        {
          groupId: 'Machine',
          children: [{ field: '_id' }],
        },
        {
          groupId: dateHeaderName,
          children: [{field: "date"}]
        },
        {
            groupId: 'CPU',
            children: [{ field: 'cpuUser' }, { field: 'cpuSystem' }, {field:'cpuIdle' }],
          },
          {
            groupId: 'MEMORY',
            children: [{ field: 'memoryUsed' }, { field: 'availableMemory' }],
          },
        {
            groupId: 'DISK',
            children: [{ field: 'diskUsed' }, { field: 'diskAvailable' }, {field:'numberOfOperations' },{field: 'diskLatency'}],
        },
  
      ]}

      onColumnVisibilityModelChange={handleColumnVisibilityChange}
      onRowSelectionModelChange = {handleRowSelectionModelChange}
      
     

      />
    </div>
  );
}

export default Table; 
