const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { createCompany, updateCompany, deleteCompany, getAllCompaniesLocal, getAllCompaniesExternal, getCompanyByUser } = require('../controllers/companies');
const { createUser, getUserRol } = require('../controllers/users');
const { getProduct, createProduct, updateProduct, deleteProduct, getAllProducts, getProductsByBrand } = require('../controllers/products');
const { getAllContractsLocal, getAllContractsExternal, createContract, updateContract, deleteContract, getContractsByCompanyLocal, getContractsByCompanyExternal } = require('../controllers/contracts');
const { getAllBrands, createBrand, updateBrand, deleteBrand } = require('../controllers/brands');
const { getAllStates } = require('../controllers/states');
const { getAllPrioritys } = require('../controllers/prioritys');
const { getAllResponsibles } = require('../controllers/responsibles');
const { setPriority, setState, setResponsible, setHours, setAutoEvaluation, setNote, setFilePath, getTicketActionByTicketId, setHiddenNote } = require('../controllers/ticket_actions');
const { createTicketTrans, updateTicketTrans, createTicketClient, deleteTicket, getAllTicketsByFilter } = require('../controllers/tickets');

const router = Router();

router.post(
    '/getAllCompaniesLocal',
    [
        check('username', 'El username es obligatorio').not().isEmpty(),
    ],

    getAllCompaniesLocal
);

router.post(
    '/getAllCompaniesExternal',
    [
        check('username', 'El username es obligatorio').not().isEmpty(),
    ],

    getAllCompaniesExternal
);

router.post(
    '/createCompany',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('direccion', 'La direccion es obligatorio').not().isEmpty(),
        check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        check('mail', 'El mail es obligatorio').not().isEmpty(),

        validarCampos
    ],

    createCompany
);

router.put(
    '/updateCompany/:id',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('direccion', 'La direccion es obligatorio').not().isEmpty(),
        check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        check('mail', 'El mail es obligatorio').not().isEmpty(),
        check('habilitado', 'El campo habilitado es obligatorio').not().isEmpty(),

        validarCampos
    ],

    updateCompany
);

router.delete(
    '/deleteCompany/:id',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),

        validarCampos
    ],

    deleteCompany
);


router.post(
    '/createUser',
    [
        check('usuario', 'El usuario es obligatorio').not().isEmpty(),
        check('password', 'La password es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        check('mail', 'El mail es obligatorio').not().isEmpty(),
        check('mail', 'El mail debe tener el formato correcto').not().isEmail(),
        check('usuario', 'El usuario debe tener al menos 8 caracteres').isLength({ min: 8 }),

        validarCampos
    ],

    createUser
);

router.post(
    '/getUserRol',
    [
        check('label', 'El label es obligatorio').not().isEmpty(),

        validarCampos
    ],

    getUserRol
);

router.post(
    '/getProduct',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),

        validarCampos
    ],

    getProduct
);

router.post(
    '/getProductsByBrand',
    [
        check('marca_id', 'Debe ingresar una marca').not().isEmpty(),

        validarCampos
    ],

    getProductsByBrand
);

router.post(
    '/getAllProducts',
    [
    ],

    getAllProducts
);

router.post(
    '/createProduct',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('modelo', 'El modelo es obligatorio').not().isEmpty(),
        check('habilitado', 'Habilitado es obligatorio').not().isEmpty(),
        check('marca_id', 'Marca id es obligatorio').not().isEmpty(),

        validarCampos
    ],

    createProduct
);

router.put(
    '/updateProduct/:id',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('modelo', 'El modelo es obligatorio').not().isEmpty(),
        check('habilitado', 'El habilitado es obligatorio').not().isEmpty(),
        check('marca_id', 'El marca_id es obligatorio').not().isEmpty(),

        validarCampos,

    ],

    updateProduct
);

router.delete(
    '/deleteProduct/:id',
    [
        check('id', 'El label es obligatorio').not().isEmpty(),

        validarCampos,
    ],

    deleteProduct
);

router.post(
    '/getAllContractsLocal',
    [
        check('username', 'El id es obligatorio').not().isEmpty(),
    ],

    getAllContractsLocal
);

router.post(
    '/getAllContractsExternal',
    [
        check('username', 'El id es obligatorio').not().isEmpty(),
    ],

    getAllContractsExternal
);

router.post(
    '/getContractsByCompanyLocal',
    [
        check('username', 'El username es obligatorio').not().isEmpty(),
        check('empresa_id', 'El nombre de la compañía es obligatorio').not().isEmpty(),
    ],

    getContractsByCompanyLocal
);

router.post(
    '/getContractsByCompanyExternal',
    [
        check('username', 'El username es obligatorio').not().isEmpty(),
        check('empresa_id', 'El nombre de la compañía es obligatorio').not().isEmpty(),
    ],

    getContractsByCompanyExternal
);

router.post(
    '/createContract',
    [
        check('empresa_id', 'empresa_id es obligatorio').not().isEmpty(),
        check('ejecutivo_id', 'ejecutivo_id es obligatorio').not().isEmpty(),
        check('sla_horas_respuesta', 'sla_horas_respuesta es obligatorio').not().isEmpty(),
        check('sla_horas_provisorio', 'sla_horas_provisorio es obligatorio').not().isEmpty(),
        check('sla_horas_definitivo', 'sla_horas_definitivo es obligatorio').not().isEmpty(),
        check('tipo', 'El tipo es obligatorio').not().isEmpty(),
        check('horas_paquete', 'horas_paquete es obligatorio').not().isEmpty(),
        check('notas', 'notas es obligatorio').not().isEmpty(),
        check('habilitado', 'habilitado es obligatorio').not().isEmpty(),
        check('soporte_onsite', 'soporte_onsite es obligatorio').not().isEmpty(),
        check('reemplazo_partes', 'reemplazo_partes es obligatorio').not().isEmpty(),
        check('fecha_inicio', 'fecha_inicio es obligatorio').not().isEmpty(),
        check('fecha_fin', 'fecha_fin es obligatorio').not().isEmpty(),

        validarCampos
    ],

    createContract
);

router.put(
    '/updateContract/:id',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),
        check('empresa_id', 'empresa_id es obligatorio').not().isEmpty(),
        check('ejecutivo_id', 'ejecutivo_id es obligatorio').not().isEmpty(),
        check('sla_horas_respuesta', 'sla_horas_respuesta es obligatorio').not().isEmpty(),
        check('sla_horas_provisorio', 'sla_horas_provisorio es obligatorio').not().isEmpty(),
        check('sla_horas_definitivo', 'sla_horas_definitivo es obligatorio').not().isEmpty(),
        check('tipo', 'tipo es obligatorio').not().isEmpty(),
        check('horas_paquete', 'horas_paquete es obligatorio').not().isEmpty(),
        check('notas', 'notas es obligatorio').not().isEmpty(),
        check('habilitado', 'habilitado es obligatorio').not().isEmpty(),
        check('soporte_onsite', 'soporte_onsite es obligatorio').not().isEmpty(),
        check('reemplazo_partes', 'reemplazo_partes es obligatorio').not().isEmpty(),

        validarCampos
    ],

    updateContract
);

router.delete(
    '/deleteContract/:id',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),

        validarCampos,
    ],

    deleteContract
);

router.post(
    '/getAllBrands',
    [
    ],

    getAllBrands
);

router.post(
    '/createBrand',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),

        validarCampos,
    ],

    createBrand
);

router.put(
    '/updateBrand/:id',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),

        validarCampos,

    ],

    updateBrand
);

router.delete(
    '/deleteBrand/:id',
    [
        check('id', 'El nombre es obligatorio').not().isEmpty(),

        validarCampos,
    ],

    deleteBrand
);

router.post(
    '/getAllResponsibles',
    [
        check('username', 'El rol es obligatorio').not().isEmpty(),
        check('rol', 'El rol es obligatorio').not().isEmpty(),
    ],

    getAllResponsibles
);

router.post(
    '/getAllPrioritys',
    [

    ],

    getAllPrioritys
);

router.post(
    '/getAllStates',
    [

    ],

    getAllStates
);

//TODO: Verificar
router.post(
    '/setResponsible',
    [
        check('ticket_id', 'El ticket_id es obligatorio').not().isEmpty(),
        check('responsable_id', 'El responsable_id es obligatorio').not().isEmpty(),
        check('username', 'El username es obligatorio').not().isEmpty(),
    ],

    setResponsible
);

//TODO: Verificar
router.post(
    '/setPriority',
    [
        check('ticket_id', 'El ticket_id es obligatorio').not().isEmpty(),
        check('prioridad', 'La prioridad es obligatoria').not().isEmpty(),
        check('username', 'El username es obligatorio').not().isEmpty(),
    ],

    setPriority
);

//TODO: Verificar
router.post(
    '/setState',
    [
        check('ticket_id', 'El ticket_id es obligatorio').not().isEmpty(),
        check('estado', 'El estado es obligatorio').not().isEmpty(),
        check('username', 'El username es obligatorio').not().isEmpty(),
    ],

    setState
);

//TODO: Verificar
router.post(
    '/setNote',
    [
        check('ticket_id', 'El ticket_id es obligatorio').not().isEmpty(),
        check('notas', 'Las notas son obligatorias').not().isEmpty(),
        check('username', 'El username es obligatorio').not().isEmpty(),
    ],

    setNote
);

//TODO: Verificar
router.post(
    '/setAutoEvaluation',
    [
        check('ticket_id', 'El ticket_id es obligatorio').not().isEmpty(),
        check('auto_evaluacion', 'La autoevaluacion es obligatoria').not().isEmpty(),
        check('username', 'El username es obligatorio').not().isEmpty(),
    ],

    setAutoEvaluation
);

//TODO: Verificar
router.post(
    '/setHours',
    [
        check('ticket_id', 'El ticket_id es obligatorio').not().isEmpty(),
        check('horas', 'Las horas son obligatoria').not().isEmpty(),
        check('username', 'El username es obligatorio').not().isEmpty(),

    ],

    setHours
);

//TODO: Verificar
router.post(
    '/setFilePath',
    [
        check('ticket_id', 'El ticket_id es obligatorio').not().isEmpty(),
        check('archivo', 'El archivo son obligatoria').not().isEmpty(),
        check('username', 'El username es obligatorio').not().isEmpty(),

        validarCampos,
    ],

    setFilePath
);

//TODO: Verificar
router.post(
    '/getTicketActionByTicketId',
    [
        check('ticket_id', 'Debe ingresar un ticket_id').not().isEmpty(),
        check('username', 'Debe ingresar un username').not().isEmpty(),

        validarCampos,

    ],

    getTicketActionByTicketId
);

//TODO: Modificar
router.post(
    '/setHiddenNote',
    [
        check('ticket_id', 'El ticket_id es obligatorio').not().isEmpty(),
        check('nota', 'La nota oculta es obligatorio').not().isEmpty(),
        check('username', 'El username es obligatorio').not().isEmpty(),

        validarCampos,
    ],

    setHiddenNote
);

router.put(
    '/updateTicketTrans',
    [
        check('username', 'El username es obligatorio').not().isEmpty(),
        check('empresaId', 'La empresaId no puede estar vacío').notEmpty(),
        check('tipoFalla', 'El tipoFalla no puede estar vacío').notEmpty(),
        check('cliente', 'El cliente no puede estar vacío').notEmpty(),
        check('partner', 'El partner no puede estar vacío').notEmpty(),
        check('rma', 'El rma no puede estar vacío').notEmpty(),
        check('bug', 'La bug no puede estar vacía').notEmpty(),
        check('comment', 'El comment no puede estar vacío').notEmpty(),
        check('nroSerie', 'El nroSerie no puede estar vacío').notEmpty(),
        check('nodo', 'El nodo no puede estar vacío').notEmpty(),
        check('titulo', 'El titulo no puede estar vacío').notEmpty(),
        check('causaRaiz', 'El causaRaiz no puede estar vacío').notEmpty(),
        check('preventa', 'El preventa no puede estar vacío').notEmpty(),
        check('vendedor', 'El vendedor no puede estar vacío').notEmpty(),
        check('producto', 'El producto no puede estar vacío').notEmpty(),
        check('esProjecto', 'El isproject no puede estar vacío').notEmpty(),
        check('proyecton', 'El proyecton no puede estar vacío').notEmpty(),
        check('array_user_id_notif', 'El array_user_id_notif no puede estar vacío').notEmpty(),

        validarCampos,
    ],

    updateTicketTrans
);

router.post(
    '/createTicketTrans',
    [
        check('username', 'El username es obligatorio').not().isEmpty(),
        check('contratoId', 'El contratoId no puede estar vacío').notEmpty(),
        check('productoId', 'El productoId no puede estar vacío').notEmpty(),
        check('tipoFalla', 'El tipoFalla no puede estar vacío').notEmpty(),
        check('title', 'El title no puede estar vacío').notEmpty(),
        check('description', 'La description no puede estar vacía').notEmpty(),
        check('nroSerie', 'El nroSerie no puede estar vacío').notEmpty(),
        check('nodo', 'El nodo no puede estar vacío').notEmpty(),
        check('esProyecto', 'El esProyecto no puede estar vacío').notEmpty(),
        check('padreId', 'El padreId no puede estar vacío').notEmpty(),
        check('preventaId', 'El preventaId no puede estar vacío').notEmpty(),
        check('vendedorId', 'El vendedorId no puede estar vacío').notEmpty(),
        check('tkEnPartner', 'El tkEnPartner no puede estar vacío').notEmpty(),
        check('array_user_id_notif', 'El array_user_id_notif no puede estar vacío').notEmpty(),

        validarCampos,
    ],

    createTicketTrans
);

router.post(
    '/createTicketClient',
    [
        check('username', 'El username es obligatorio').not().isEmpty(),
        check('empresaId', 'La empresaId no puede estar vacío').notEmpty(),
        check('contratoId', 'El contratoId no puede estar vacío').notEmpty(),
        check('productoId', 'El productoId no puede estar vacío').notEmpty(),
        check('tipoFalla', 'El tipoFalla no puede estar vacío').notEmpty(),
        check('title', 'El title no puede estar vacío').notEmpty(),
        check('description', 'La description no puede estar vacía').notEmpty(),
        check('nroSerie', 'El nroSerie no puede estar vacío').notEmpty(),
        check('nodo', 'El nodo no puede estar vacío').notEmpty(),
        check('array_user_id_notif', 'El array_user_id_notif no puede estar vacío').notEmpty(),

        validarCampos,
    ],

    createTicketClient
);

router.delete(
    '/deleteTicket/:id',
    [
        check('id', 'El label es obligatorio').not().isEmpty(),

        validarCampos,
    ],

    deleteTicket
);

router.post(
    '/getAllTicketsByFilter',
    [
        check('pCadenaSearch', 'El label es obligatorio').not().isEmpty(),
        check('username', 'El label es obligatorio').not().isEmpty(),
        check('offset', 'El label es obligatorio').not().isEmpty(),
        check('estadoId', 'El label es obligatorio').not().isEmpty(),
        check('prioridadId', 'El label es obligatorio').not().isEmpty(),
        check('tipoId', 'El label es obligatorio').not().isEmpty(),
        check('tipoTicket', 'El label es obligatorio').not().isEmpty(),
    ],

    getAllTicketsByFilter
);

module.exports = router;