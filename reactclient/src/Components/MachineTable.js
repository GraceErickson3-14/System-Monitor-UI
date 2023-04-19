import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

const columns = [
    { id: '_id', label: 'Machine ID', minWidth: 100 },
    { id: 'timestamp', label: 'Timestamp', minWidth: 150 },
    { id: 'cpuUser', label: 'User (%)', minWidth: 100, align: 'right' },
    { id: 'cpuSystem', label: 'System (%)', minWidth: 100, align: 'right' },
    { id: 'cpuIdle', label: 'Idle (%)', minWidth: 100, align: 'right' },
    { id: 'memoryUsed', label: 'Used (GB)', minWidth: 100, align: 'right' },
    { id: 'availableMemory', label: 'Available(GB)', minWidth: 100, align: 'right' },
    { id: 'diskUsed', label: 'Disk Used (%)', minWidth: 100, align: 'right' },
    { id: 'diskAvailable', label: 'Available (%)', minWidth: 100, align: 'right' },
    { id: 'numberOfOperations', label: 'Operations', minWidth: 100, align: 'right' },
    { id: 'diskLatency', label: 'Latency (ms)', minWidth: 100, align: 'right' },
  ];



const MachineForm = ({ selectedMachines, setSelectedMachines, selectedTimeFrame, setSelectedTimeFrame, handleSubmit }) => {
    return (
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ minWidth: 200, marginRight: 1 }}>
          <InputLabel id="machine-select-label">Machines</InputLabel>
          <Select
            labelId="machine-select-label"
            id="machine-select"
            multiple
            value={selectedMachines}
            onChange={(e) => setSelectedMachines(e.target.value)}
          >
            {/* Replace the list with your actual machine IDs */}
            {['Machine 1', 'Machine 2', 'Machine 3'].map((machine) => (
              <MenuItem key={machine} value={machine}>
                {machine}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120, marginRight: 1 }}>
          <InputLabel id="timeframe-select-label">Time Frame</InputLabel>
          <Select
            labelId="timeframe-select-label"
            id="timeframe-select"
            value={selectedTimeFrame}
            onChange={(e) => setSelectedTimeFrame(e.target.value)}
          >
            <MenuItem value="day">Day</MenuItem>
            <MenuItem value="week">Week</MenuItem>
            <MenuItem value="month">Month</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" sx={{marginTop:"10px"}}>
          Get Data
        </Button>
      </form>
    );
  };

  const createData = (
    _id,
    timestamp,
    cpuUser,
    cpuSystem,
    cpuIdle,
    memoryUsed,
    availableMemory,
    diskUsed,
    diskAvailable,
    numberOfOperations,
    diskLatency
  ) => {
    return {
      _id,
      timestamp,
      cpuUser,
      cpuSystem,
      cpuIdle,
      memoryUsed,
      availableMemory,
      diskUsed,
      diskAvailable,
      numberOfOperations,
      diskLatency,
    };
  };
  
  
  const MachineTableContent = ({ data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
    const formattedData = data.map((row) =>
      createData(
        row._id,
        row.timestamp,
        row.cpuUser,
        row.cpuSystem,
        row.cpuIdle,
        row.memoryUsed,
        row.availableMemory,
        row.diskUsed,
        row.diskAvailable,
        row.numberOfOperations,
        row.diskLatency
      )
    );
  
    return (
      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 440, zIndex: -5 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={2}>
                  Machine
                </TableCell>
                <TableCell align="center" colSpan={3}>
                  CPU
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Memory
                </TableCell>
                <TableCell align="center" colSpan={3}>
                  Disk
                </TableCell>
              </TableRow>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {formattedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={formattedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
  };

  const MachineTable = ({ data }) => {
 
    const [selectedMachines, setSelectedMachines] = useState([]);
    const [selectedTimeFrame, setSelectedTimeFrame] = useState('day');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
      };
      
      const handleSubmit = async (event) => {
      event.preventDefault();};

      return (
        <>
          <div style={{ marginBottom: '10px' }}>
            <MachineForm
              selectedMachines={selectedMachines}
              setSelectedMachines={setSelectedMachines}
              selectedTimeFrame={selectedTimeFrame}
              setSelectedTimeFrame={setSelectedTimeFrame}
              handleSubmit={handleSubmit}
            />
          </div>
          <MachineTableContent
            data={data}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      );
    };
    
   
export default MachineTable;
      
      
