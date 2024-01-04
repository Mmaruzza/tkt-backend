import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    // **** variables de grilla de tickets *****
    ticketsFilterListSelected: [],
    ticketsFilterListSelectedConfirm: [],

    ticketsGridDataList: [],

    ticketsGridDataLoading: false,
    // bandera para controlar el paginado,
    // determina si aparece o no el boton "siguiente pagina" 
    ticketsGridDataHasMorePages: false,

}


export const ticketSlice = createSlice(
    {
        name: "ticket",
        initialState: initialState,
        reducers: {
            ticketClearDataRedux: (state, action) => {

                state.ticketsFilterListSelected= [];
                state.ticketsFilterListSelectedConfirm= [];
                state.ticketsGridDataList= [];
                state.ticketsGridDataLoading= false;
                state.ticketsGridDataHasMorePages= false;
            },

            ticketGridDataLoadedRedux: (state, action) => {
                
                state.ticketsGridDataList= action.payload;
                // AL OBTENER DATOS DE BUSQUEDA CONFIRMO EL FILTRO ACTUALMENTE UTILIZADO PARA LOS DATOS.
                state.ticketsFilterListSelectedConfirm= state.ticketsFilterListSelected;
                // bandera de carga de datos: false ( finalizo la carga)
                state.ticketsGridDataLoading= false;

            },
            ticketGridDataLoadingRedux: ( state, action ) => {
                state.ticketsGridDataLoading= false;
            },

            ticketGridDataHasMorePagesRedux: ( state, action ) => {
                state.ticketsGridDataHasMorePages= action.payload;
            },
            // carga de filtros de ticketera
            ticketFilterListSelectedAddNewRedux: ( state, action ) => {
                state.ticketsFilterListSelected = state.echiFilterListSelected.concat(
                    action.payload
                  )
            },
            ticketFilterListSelectedDeleteRedux: ( state, action ) => {
                state.ticketFilterListSelected= state.echiFilterListSelected.filter(
                    (item) => item.source !== action.payload.source
                  )
            },
        }
    }
);

export const { ticketClearDataRedux, ticketGridDataLoadedRedux, ticketGridDataLoadingRedux, ticketGridDataHasMorePagesRedux, ticketFilterListSelectedAddNewRedux, ticketFilterListSelectedDeleteRedux } = ticketSlice.actions;
export default ticketSlice.reducer;