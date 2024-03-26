const { response } = require('express');
const { createDBTicketTrans, updateDBTicketTrans, createDBTicketClient, deleteDBTicket, getAllDBTicketsByFilter, getAllDBFailTypes, getAllDBTicketTypes, getAllDBTicketsByFilterV2 } = require('../databases/queries_tickets');
const { getDBCompanyByUser } = require('../databases/queries_companies');
const { getDBUserIdByUser, getDBTypeUserByUser } = require('../databases/queries_users');
const { getDBContractsIdByCompany } = require('../databases/queries_contracts');

const { logger, loggerCSV } = require('../logger');
const { userType } = require('../helpers/constants');
const crypto = require('crypto');

const createTicketTrans = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token

    const { username, empresaId, contratoId, productoId, tipoFalla, title, description, nroSerie, nodo, esProyecto, padreId, preventaId, vendedorId, tkEnPartner, array_user_id_notif } = req.body;

    logger.info(`createTicketTrans username:${username} empresaId:${empresaId} contratoId:${contratoId} productoId:${productoId} tipoFalla:${tipoFalla} title:${title} description:${description} nroSerie:${nroSerie} nodo:${nodo} esProyecto:${esProyecto} padreId:${padreId} preventaId:${preventaId} vendedorId:${vendedorId} tkEnPartner:${tkEnPartner} array_user_id_notif:${array_user_id_notif}`);

    const userId = await getDBUserIdByUser(username);

    try {
        createDBTicketTrans(userId, empresaId, contratoId, productoId, tipoFalla, title, description, nroSerie, nodo, esProyecto, padreId, preventaId, vendedorId, tkEnPartner, array_user_id_notif)
            .then(result => {
                res.status(200).json({
                    ok: true,
                    value: { id: result },
                    msg: `Ticket creado correctamente.`
                });

            })
            .catch(dataError => {
                logger.error(`createTicketTrans => createDBTicketTrans : params=> username:${username} userId:${userId} empresaId:${empresaId} contratoId:${contratoId} productoId:${productoId} tipoFalla:${tipoFalla} title:${title} description:${description} nroSerie:${nroSerie} nodo:${nodo} esProyecto:${esProyecto} padreId:${padreId} preventaId:${preventaId} vendedorId:${vendedorId} tkEnPartner:${tkEnPartner} array_user_id_notif:${array_user_id_notif} error=> ${dataError}`);
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo crear la acción createTicket del ticket. `
                });
            });

    } catch (error) {
        logger.error(`createTicketTrans => createDBTicketTrans : params=> username:${username} userId:${userId} empresaId:${empresaId} contratoId:${contratoId} productoId:${productoId} tipoFalla:${tipoFalla} title:${title} description:${description} nroSerie:${nroSerie} nodo:${nodo} esProyecto:${esProyecto} padreId:${padreId} preventaId:${preventaId} vendedorId:${vendedorId} tkEnPartner:${tkEnPartner} array_user_id_notif:${array_user_id_notif} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const updateTicketTrans = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token

    const { username, empresaId, tipoFalla, cliente, partner, rma, bug, comment, nroSerie, nodo, titulo, causaRaiz, preventa, vendedor, producto, esProjecto, proyecton, array_user_id_notif } = req.body;
    logger.info(`UpdateTicketTrans username:${username} empresaId:${empresaId} tipoFalla:${tipoFalla} cliente:${cliente} partner:${partner} rma:${rma} bug:${bug} comment:${comment} nroSerie:${nroSerie} nodo:${nodo} titulo:${titulo} causaRaiz:${causaRaiz} preventa:${preventa} vendedor:${vendedor} producto:${producto} esProyecto:${esProjecto} proyecton:${proyecton} array_user_id_notif:${array_user_id_notif}`);

    const userId = await getDBUserIdByUser(username);

    try {
        logger.info(`createTicketClient userId:${userId}`);

        updateDBTicketTrans(userId, empresaId, tipoFalla, cliente, partner, rma, bug, comment, nroSerie, nodo, titulo, causaRaiz, preventa, vendedor, producto, esProjecto, proyecton, array_user_id_notif)
            .then(result => {
                logger.info(`<== updateTicketTrans`);

                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: `El ticket fue actualizado correctamente.`
                });

            })
            .catch(dataError => {
                logger.error(`updateTicketTrans  => updateDBTicketTrans : params=> updateTicketTrans username:${username} userId:${userId} empresaId:${empresaId} tipoFalla:${tipoFalla} cliente:${cliente} partner:${partner} rma:${rma} bug:${bug} comment:${comment} nroSerie:${nroSerie} nodo:${nodo} titulo:${titulo} causaRaiz:${causaRaiz} preventa:${preventa} vendedor:${vendedor} producto:${producto} esProyecto:${esproject} proyecton:${proyecton} array_user_id_notif:${array_user_id_notif} Error:${dataError}`);
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo actualizar el ticket `
                });
            });

    } catch (error) {
        logger.error(`updateTicketTrans : params=> updateTicket username:${username} userId:${userId} empresaId:${empresaId} tipoFalla:${tipoFalla} cliente:${cliente} partner:${partner} rma:${rma} bug:${bug} comment:${comment} nroSerie:${nroSerie} nodo:${nodo} titulo:${titulo} causaRaiz:${causaRaiz} preventa:${preventa} vendedor:${vendedor} producto:${producto} esProyecto:${esproject} proyecton:${proyecton} array_user_id_notif:${array_user_id_notif} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Hable con el administrador'
        });
    }
}

const createTicketClient = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token

    const { username, empresaId, contratoId, productoId, tipoFalla, title, description, nroSerie, nodo, array_user_id_notif } = req.body;

    logger.info(`createTicketClient username:${username} contratoId:${contratoId} productoId:${productoId} tipoFalla:${tipoFalla} title:${title} description:${description} nroSerie:${nroSerie} nodo:${nodo} array_user_id_notif:${array_user_id_notif}`);

    const empresaIdByUser = await getDBCompanyByUser(username);
    const userId = await getDBUserIdByUser(username);
    const contracts = await getDBContractsIdByCompany(54);

    console.log('empresaIdByUser: ' + empresaIdByUser);
    console.log('userId: ' + userId);
    console.table(contracts);

    try {
        logger.info(`createTicketClient userId:${userId} empresaIdByUser:${empresaIdByUser}`);

        if (empresaId == empresaIdByUser) {
            if (contracts.some(contrato => contrato.id === contratoId)) {
                createDBTicketClient(userId, empresaId, contratoId, productoId, tipoFalla, title, description, nroSerie, nodo, array_user_id_notif)
                    .then(result => {
                        res.status(200).json({
                            ok: true,
                            value: { id: result },
                            msg: `Ticket creado correctamente.`
                        });
                    })
                    .catch(dataError => {
                        logger.error(`createDBTicketClient => createDBTicketClient : params=> userId:${userId} empresaId:${empresaId} contratoId:${contratoId} productoId:${productoId} tipoFalla:${tipoFalla} title:${title} description:${description} nroSerie:${nroSerie} nodo:${nodo} array_user_id_notif:${array_user_id_notif} error=> ${dataError}`);
                        res.status(501).json({
                            ok: false,
                            error: dataError,
                            msg: `No se pudo crear la acción createTicket del ticket.`
                        });
                    });
            } else {
                res.status(401).json({
                    ok: true,
                    value: { id: -1 },
                    msg: `No coinciden los contratos con su empresa.`
                });
            }
        } else {
            res.status(401).json({
                ok: true,
                value: { id: -2 },
                msg: `No puede crear un ticket de otra empresa que no sea propia.`
            });
        }

    } catch (error) {
        logger.error(`createTicketClient => createDBTicketClient : params=> userId:${userId} empresaId:${empresaId} contratoId:${contratoId} productoId:${productoId} tipoFalla:${tipoFalla} title:${title} description:${description} nroSerie:${nroSerie} nodo:${nodo} array_user_id_notif:${array_user_id_notif} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const deleteTicket = async (req, res = response) => {

    const id = req.params.id;

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token
    logger.info(`deleteTicket id:${id}`)

    try {
        // AL ELIMINAR PUEDE QUE SEA NECESARIO CHEQUEAR PRIVILEGIOS DE USUARIO
        // DEBE VALIDAR SI EXISTE EL ELEMENTO

        deleteDBTicket(id)
            .then(result => {
                if (result === 1) {
                    res.status(200).json({
                        ok: true,
                        value: result,
                        msg: `El ticket: ${id} fue eliminado correctamente`
                    });
                }
                else {
                    //Ocurrio un error no manejado en sql.
                    return res.status(401).json({
                        ok: false,
                        msg: 'El ticket no pudo ser eliminado del sistema.'
                    });
                }
            })
            .catch(dataError => {
                logger.error(`deleteTicket => deleteDBTicket: params=> id=${id} error=> ${dataError}`);
                // DESDE CAPA databases recibira un objeto error { code, message, stack }
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo eliminar el ticket '${id}' `
                });

            });
    } catch (error) {
        logger.error(`deleteTicket: params=> id=${id} error=> ${error}`);
        res.status(502).json({
            ok: false,
            error: error,
            msg: `No se pudo eliminar el ticket '${id}' `
        });
    }
}

const getAllTicketsByFilter = async (req, res = response) => {

    //TODO: Instancia de los nuevos parámetros de endpoint
    //const { titulo, causaRaiz, ticketPartner, empresaId, productoId, responsableId, numeroId, prioridad, estado, tipoEstado, tipoFalla, tktip, dateFrom, dateTo, tksinac, tipoUsuario, usuarioId, offset, estadoid, prioridadid, tipoid, tipoticket, orderBy, orderByType, limit } = req.body;

    const { pCadenaSearch, username, offset, estadoId, prioridadId, tipoId, tipoTicket, orderBy, orderByType, limit } = req.body;

    let function_enter_time = new Date();

    logger.info(`==> getAllTicketsByFilter.`)
    try {
        const userId = await getDBUserIdByUser(username);
        const tipoUsuario = await getDBTypeUserByUser(username);

        //TODO: Agregar logueos de variables
        logger.info(`getAllTicketsByFilter pCadenaSearch:${pCadenaSearch} username:${username} offset:${offset} estadoId:${estadoId} prioridadId:${prioridadId} tipoId:${tipoId} tipoTicket:${tipoTicket} orderBy:${orderBy} orderByType:${orderByType} userId:${userId} tipoUsuario:${tipoUsuario} limit:${limit}`);

        //TODO: Llamada a método de consulta
        //getAllDBTicketsByFilter(titulo, causaRaiz, ticketPartner, empresaId, productoId, responsableId, numeroId, prioridad, estado, tipoEstado, tipoFalla, tktip, dateFrom, dateTo, tksinac, tipoUsuario, usuarioId, offset, estadoid, prioridadid, tipoid, tipoticket, orderBy, orderByType, limit)
        getAllDBTicketsByFilter(pCadenaSearch, tipoUsuario, userId, offset, estadoId, prioridadId, tipoId, tipoTicket, orderBy, orderByType, limit)
            .then(result => {
                logger.info(`<== getAllTicketsByFilter`);
                loggerCSV.info(`getAllTicketsByFilter, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de tickets obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getAllTicketsByFilter => getAllDBTicketsByFilter error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getAllTicketsByFilter error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo listado de tickets.'
        });
    }
}

const getAllTicketsByFilterV2 = async (req, res = response) => {

    //TODO: Instancia de los nuevos parámetros de endpoint
    const { username, titulo, causaRaiz, ticketPartner, empresaId, productoId, responsableId, numeroId, prioridad, estado, tipoFalla, dateFrom, dateTo, offset, tipoTicket, tksinac, orderBy, orderByType, limit } = req.body;
    console.log("EmpresaID Test: " + empresaId);

    let function_enter_time = new Date();
    let empresaIdAux;
    logger.info(`==> getAllTicketsByFilterV2.`)
    try {
        const usuarioId = await getDBUserIdByUser(username);
        const tipoUsuario = await getDBTypeUserByUser(username);

        //Si no es un tipo de usuario Trans forzar id de la empresa que viene por username del x-token de la consulta en el api-gateway
        if (tipoUsuario == 2 && empresaId == 3) {
            empresaIdAux = await getDBCompanyByUser(username);
        } else {
            empresaIdAux = empresaId;
        }

        logger.info(`getAllTicketsByFilter username:${username} titulo:${titulo} causaRaiz:${causaRaiz} ticketPartner:${ticketPartner} empresaId:${empresaId} productoId:${productoId} responsableId:${responsableId} numeroId:${numeroId} estado:${estado} tipoFalla:${tipoFalla} dateFrom:${dateFrom} dateTo:${dateTo} offset:${offset} tipoTicket:${tipoTicket} tksinac:${tksinac} orderBy:${orderBy} orderByType:${orderByType} limit:${limit}`);

        getAllDBTicketsByFilterV2(titulo, causaRaiz, ticketPartner, empresaIdAux, productoId, responsableId, numeroId, prioridad, estado, tipoFalla, dateFrom, dateTo, tipoUsuario, usuarioId, offset, tipoTicket, tksinac, orderBy, orderByType, limit)
            .then(result => {
                logger.info(`<== getAllTicketsByFilterV2`);
                loggerCSV.info(`getAllTicketsByFilterV2, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de tickets obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getAllTicketsByFilterV2 => getAllDBTicketsByFilterV2 error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getAllTicketsByFilter error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo listado de tickets.'
        });
    }
}

const getFailTypes = async (req, res = response) => {

    let function_enter_time = new Date();
    logger.info(`==> getFailTypes.`)
    try {
        getAllDBFailTypes()
            .then(result => {
                logger.info(`<== getFailTypes`);
                loggerCSV.info(`getFailTypes, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de fallas obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getAllFailTypes => getAllDBFailTypes error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getAllDBFailTypes error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo listado de fallas.'
        });
    }
}

const getTicketTypes = async (req, res = response) => {

    let function_enter_time = new Date();
    logger.info(`==> getTicketTypes.`)
    try {
        getAllDBTicketTypes()
            .then(result => {
                logger.info(`<== getTicketTypes`);
                loggerCSV.info(`getTicketTypes, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de tipos obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getTicketTypes => getAllDBTicketTypes error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getAllDBTicketTypes error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo listado de tipos.'
        });
    }
}

module.exports = {
    getAllTicketsByFilter,
    updateTicketTrans,
    createTicketTrans,
    createTicketClient,
    deleteTicket,
    getFailTypes,
    getTicketTypes,
    getAllTicketsByFilterV2
}
