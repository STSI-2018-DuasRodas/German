import Vue from 'vue';
import Router from 'vue-router';
import login from './views/Login.vue';
import OrderList from './views/Order_List.vue';
import cadUser from './views/cad/Cad_User.vue';
import Order from './views/Order.vue';
import EPI from './views/EPI_Confirm.vue';
import cadOrder from './views/cad/Cad_Order.vue';
import cadLocalInstall from './views/cad/Cad_Local_Install.vue';
import cadDefect from './views/cad/Cad_Defect.vue';
import cadMaintenance from './views/cad/Cad_Maintenance_Type.vue';
import cadEquipments from './views/cad/Cad_equipments.vue';
import cadEpis from './views/cad/Cad_Epis';
import cad_Layout from './views/cad/Cad_Layout';
import cad_Operacao from './views/cad/Cad_Operacao';
import cad_Material from './views/cad/Cad_Material';
import cad_Center from './views/cad/Cad_center';
import cad_Symptom from './views/cad/Cad_symptom';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/',
    },
    {
      path: '/',
      name: 'Login',
      component: login,
    },
    {
      path: '/order',
      name: 'Listagem',
      component: OrderList,
    },
    {
      path: '/order/:id',
      name: 'Ordem de manutenção',
      component: Order,
    },
    {
      path: '/user',
      name: 'Cadastro de Usuário',
      component: cadUser,
    },
    {
      path: '/epi/:id',
      name: 'Confirmação Epi\'s',
      component: EPI,
    },
    {
      path: '/epis',
      name: 'Cadastro de Epi\'s',
      component: cadEpis,
    },
    {
    path: '/layout',
    name: 'Cadastro de Layout',
    component: cad_Layout,
    },
    {
      path: '/new_order',
      name: 'Nova Ordem de Manutenção',
      component: cadOrder,
    },
    {
      path: '/local-install',
      name: 'Novo Setor',
      component: cadLocalInstall,
    },
    {
      path: '/defect',
      name: 'Novo Defeito',
      component: cadDefect,
    },
    {
      path: '/maintenance',
      name: 'Tipo de Manutenção',
      component: cadMaintenance,
    },
    {
      path: '/equipments',
      name: 'Equipamentos',
      component: cadEquipments,
    },
    {
      path: '/operation',
      name: 'Operação',
      component: cad_Operacao,
    },
    {
      path: '/material',
      name: 'Material',
      component: cad_Material,
    },
    {
      path: '/work_center',
      name: 'Centro de Trabalho',
      component: cad_Center ,
    },
    {
      path: '/symptom',
      name: 'Sintoma',
      component: cad_Symptom ,
    },
  ],
});
