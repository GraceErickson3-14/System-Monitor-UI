import {
    GridColumnMenu,
    GridColumnMenuProps,
    useGridApiRef,
    GridMenuProps,
  } from "@mui/x-data-grid";

  
  function ColumnMenu(props) {
    const apiRef = useGridApiRef();
  
    const handleHideColumn = () => {
      apiRef.current.setColumnVisibility(props.field, false);

      props.hideMenu();
    };
  
    return (
      <GridColumnMenu {...props}>
        <div onClick={handleHideColumn}>COLUMN</div>
      </GridColumnMenu>
    );
  }
  
  export default ColumnMenu;
