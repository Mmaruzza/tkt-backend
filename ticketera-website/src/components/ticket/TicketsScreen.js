import React, { useContext, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Chip, FormControl, InputLabel, MenuItem, Select, Tooltip } from '@mui/material';
import { useTheme } from '@mui/styles';
import { GridViewBigData } from '../ui/GridViewBigData';
import CircleIcon from "@mui/icons-material/Circle";
import { grey } from '@mui/material/colors';
import { arrayTabsAddNew } from '../../redux/actions/userInterfaceActions';
import { getTicketsByFilter } from '../../redux/actions/ticketActions';
import { getShortDateString } from '../../helpers/dateHelper';
import { ButtonTrans } from '../ui/ButtonTrans';
import TicketFilterDrawer from './TicketFilterDrawer';
import { SocketContext } from '../../context/SocketContext';
import { getProductsByBrand } from '../../redux/actions/productActions';


export const TicketsScreen = () => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const { prioritiesDataList } = useSelector(state => state.priority, shallowEqual);
  const { responsiblesDataList } = useSelector(state => state.responsible, shallowEqual);
  const { companiesDataList } = useSelector(state => state.company, shallowEqual);
  const { statesDataList } = useSelector(state => state.state, shallowEqual);
  const { failTypesDataList } = useSelector(state => state.failType, shallowEqual);
  const [productsDataList, setProductsDataList] = useState([])

  const { editTicketTabShown, arrayTabs } = useSelector((state) => state.ui, shallowEqual);

  const [resetPaginationTickets, setResetPaginationTickets] = useState(false);
  const [rowsPerPageTickets, setRowsPerPageTickets] = useState(10);
  const [actualOffsetTickets, setActualOffsetTickets] = useState(0);
  const [hasMorePages, setHasMorePages] = useState(true)
  const [filters, setFilters] = useState({
    title: "",
    number: "",
    type: "",
    company: "",
    responsible: "",
    product: "",
    priority: "",
    failType: "",
    state: -2,
    cause: ""
  })
  const [sorting, setSorting] = useState(1)

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const [resetPaginationGrid, setResetPaginationGrid] = useState(false);
  const [agentList, setAgentList] = useState([]);

  const columnsData = [
    { id: 'priority', label: '', cellWidth: 0, visible: true },
    { id: 'id', label: 'ID', cellWidth: 0, visible: true },
    { id: 'titulo', label: 'Titulo', cellWidth: 0, visible: true, backgroundColor: "#b5b3b3", color: 'black' },
    { id: 'empresa', label: 'Empresa', cellWidth: 0, visible: true, backgroundColor: "#b5b3b3", color: 'black' },
    { id: 'tipo_falla', label: 'Tipo de falla', cellWidth: 0, visible: true, backgroundColor: "#b5b3b3", color: 'black' },
    { id: 'responsable', label: 'Responsable', cellWidth: 0, visible: true, backgroundColor: "#b5b3b3", color: 'black' },
    { id: 'estado', label: 'Estado', cellWidth: 0, visible: true, backgroundColor: "#b5b3b3", color: 'black' },
    { id: 'fecha_creacion', label: 'Creado', cellWidth: 0, visible: true, backgroundColor: "#b5b3b3", color: 'black' }
    /*     { id: 'cerrado', label: 'Cerrado', minWidth: 100 },
        { id: 'tktrans', label: 'T.Trans', minWidth: 50 },
        { id: 'tkcliente', label: 'T.Cliente', minWidth: 50 } */
  ]

  // const { online, socket } = useContext(SocketContext);


  // useEffect(() => {
  //   if (online) {
  //     console.log('socket en tickets conectado');
  //   } else {
  //     console.log('socket en tickets desconectado');
  //   }


  // }
  //   , [online])



  useEffect(() => {
    if (filters.brand) {
      dispatch(getProductsByBrand(filters.brand)).then((res) => {
        setProductsDataList(res.value)
      })
    }
  }, [filters])


  useEffect(() => {
    dispatch(getTicketsByFilter(actualOffsetTickets, filters, formatSorting(sorting))).then((res) => {
      setAgentList(formatTicketsArray(res.value))
      if (res.value.length < 25) {
        setHasMorePages(false)
      }
      else {
        setHasMorePages(true)
      }
    })
  }, [actualOffsetTickets, filters, responsiblesDataList, sorting])


  const formatSorting = (sortId) => {
    let sorting = {
      orderBy: '',
      orderByType: ''
    }

    switch (sortId) {
      case 1:
        sorting.orderBy = 't.fecha_creacion'
        break;
      case 2:
        sorting.orderBy = 't.fecha_creacion'
        sorting.orderByType = 'ASC'
        break;
      default:
        break;
    }

    return sorting
  }
  const setPriority = (priority, state) => {
    let color = 'black';
    let text = '';

    switch (priority) {
      case 1:
        color = 'red'
        text = 'Prioridad muy alta'
        break;
      case 2:
        color = 'orange'
        text = 'Prioridad alta'
        break;
      case 3:
        color = 'green'
        text = 'Prioridad media'
        break;
      case 4:
        color = theme.palette.trans.main
        text = 'Prioridad baja'
        break;
    }

    if (state === 'Cerrado') {
      color = '#555'
      text = 'Ticket cerrado'
    }

    return (
      <Tooltip title={text}>
        <CircleIcon style={{ color: color }} />
      </Tooltip>
    );
  }

  const formatTicketsArray = (tickets) => {
    let formattedArray = [];

    tickets.forEach(ticket => {
      let formattedTicket = {
        id: ticket.id,
        estado: ticket.estado,
        tipo_falla: ticket.tipo_falla,
        titulo: ticket.titulo,
        empresa: ticket.empresa,
        priority: setPriority(ticket.prioridad, ticket.estado),
        fecha_creacion: getShortDateString(ticket.fecha_creacion),
        responsable: getResponsibleName(ticket.responsable_id)
      }
      formattedArray.push(formattedTicket)
    });

    return formattedArray
  }

  const getResponsibleName = (id) => {
    let responsible = responsiblesDataList.find(obj => obj.id === id)
    return responsible?.nombre_completo
  }

  const handleGridChangePageTickets = (newpage_limit, newpage_offset) => {
    setResetPaginationTickets(false);
    setActualOffsetTickets(newpage_offset)
  };


  const GridSelectionOnClickHandleSelect = (item) => {
    // obtengo el item seleccionado
    //  console.log(item)
    //  alert(`Entrar al ticket N: ${item.id}`);

    let tabNew = new Object();
    // definir constantes con tipos asociados a la operacion_ 
    // 0: crear ticket 1: editar ticket 2: abm de empresas 3: abm marcas 
    tabNew.type = 0;
    tabNew.title = `Ticket ${item.id}`;
    tabNew.id = item.id;
    tabNew.index = arrayTabs.length;

    dispatch(arrayTabsAddNew(tabNew));

  }

  const GridSelectionOnClickChangePage = (grid_limit, grid_offset) => {

    setResetPaginationGrid(false);
  }

  const handleFilterButton = (filters) => {
    setIsDrawerOpen(false)
    setFilters(filters)
  }

  const filterChip = (name, value) => {
    let text = '';
    console.log('name', name)
    console.log('value', value)
    switch (name) {
      case 'type':
        text = `Tipo: `
        break;
      case 'company':
        text = `Empresa: ${companiesDataList.find(obj => obj.id === value)?.nombre}`
        break;
      case 'responsible':
        text = `Responsable: ${responsiblesDataList.find(obj => obj.id === value)?.nombre_completo}`
        break;
      case 'product':
        text = `Producto: ${productsDataList.find(obj => obj.id === value)?.nombre}`
        break;
      case 'priority':
        text = `Prioridad: ${prioritiesDataList.find(obj => obj.id === value)?.prioridad}`
        break;
      case 'failType':
        text = `Tipo de falla: ${failTypesDataList.find(obj => obj.id === value)?.descripcion}`
        break;
      case 'state':
        if (value === -2) {
          text = 'Estado: Abiertos'
        }
        else {
          text = `Estado: ${statesDataList.find(obj => obj.id === value)?.estado}`
        }
        break;
      case 'number':
        text = `Numero: ${value}`
        break;
      case 'title':
        text = `Titulo: ${value}`
        break;
      case 'cause':
        text = `Causa raiz: ${value}`
        break;
    }

    return text
  }

  const deleteFilter = (filter) => {
    let tempFilters = { ...filters }
    tempFilters[filter] = "";
    setFilters(tempFilters)
  }

  return (
    <div>
      <div style={{
        width: '95vw', margin: ' 0 auto', padding: '25px', scroll: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
            <ButtonTrans onClick={() => { setIsDrawerOpen(!isDrawerOpen) }} variant='outlined'>Filtrar</ButtonTrans>
            {Object.entries(filters).map(([key, value], index) => {
              if (value && value !== -1 && value !== '' && key !== 'brand') {
                return (
                  <Chip key={key} label={filterChip(key, value)} variant='outlined' sx={{ marginLeft: '5px' }} onDelete={() => { deleteFilter(key) }} />
                )
              }
            })}
          </div>
          <div style={{ width: '150px' }}>
            <FormControl fullWidth size="small" style={{ paddingBottom: '20px', minWidth: '100px' }}>
              <InputLabel style={{ color: theme.palette.text.primary }}>Ordenar por</InputLabel>
              <Select
                sx={{ borderRadius: '20px' }}
                value={sorting}
                label="Ordenar por"
                onChange={(e) => { setSorting(e.target.value) }}
              >
                <MenuItem key={1} value={1}>Mas nuevos</MenuItem>
                <MenuItem key={1} value={2}>Mas antiguos</MenuItem>
                {/* <MenuItem key={1} value={3}>Titulo</MenuItem>
                <MenuItem key={1} value={4}>ID</MenuItem> */}
              </Select>
            </FormControl>
          </div>
        </div>

        {
          agentList.length > 0 && (
            <GridViewBigData
              columns={columnsData}
              data={agentList}
              customButtonNumber={0}
              customButtonTooltip={[]}
              customButtonIcon={[]}
              handleCustomButton={[]}
              customButtonEnable={[false]}
              initRowsPerPage={rowsPerPageTickets}
              handleGridChangePage={handleGridChangePageTickets}
              resetPagination={resetPaginationTickets}
              gridDataHasMorePages={hasMorePages}
              showColumnSelector={false}
              gridSelectionOnClick={GridSelectionOnClickHandleSelect}
              detailcolumns={[]}
              oneExpandOnly={false}
              specialButtonStyle={{ backgroundColor: "#b5b3b3", color: 'black' }}
              handleOnExpand={(item, expand) => {

              }}
              canReorderColumns={true}
              customButtonNumberDetail={0}
              customButtonEnableDetail={[]}
              customButtonTooltipDetail={[]}
              customButtonIconDetail={[]}
              handleCustomButtonDetail={[]}

              subDataActionHeaderStyle={{ backgroundColor: grey[400], color: 'black', zIndex: 1 }}
              subDataActionRowsStyle={{ backgroundColor: grey[50] }}
              subDataActionColumnShowLeft={true}
              maxHeight={'calc(100vh - 135px)'}
            />
          )
        }
      </div>
      <div className={`overlay ${isDrawerOpen ? 'show' : ''}`} onClick={() => { setIsDrawerOpen(!isDrawerOpen) }}></div>
      <div className={`drawer ${isDrawerOpen ? 'open' : ''}`} style={{ backgroundColor: theme.palette.background.main }}>
        <TicketFilterDrawer filter={handleFilterButton} handleCancelFilter={() => { setIsDrawerOpen(false) }} />
      </div>
    </div>
  )
}
