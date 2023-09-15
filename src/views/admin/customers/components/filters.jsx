import { useEffect, useState } from 'react';
import Card from 'components/card';
import api from '../../../../api/api';
import { Button } from '@chakra-ui/react';

export default function Filters() {
  const [customerPlanOptions, setCustomerPlanOptions] = useState([]);
  const [customerServiceOptions, setCustomerServiceOptions] = useState([]);

  useEffect(() => {
    api
      .get('service')
      .then((response) => {
        const result = response.data.services.map((item) => {
          return { name: item.name, id: item._id };
        });
        setCustomerServiceOptions(result);
      })
      .catch((error) => {
        console.error('Erro na requisição GET:', error);
      });
    api
      .get('plan')
      .then((response) => {
        const result = response.data.plans.map((item) => {
          return { name: item.name, id: item._id };
        });
        setCustomerPlanOptions(result);
      })
      .catch((error) => {
        console.error('Erro na requisição GET:', error);
      });
  }, []);

  const handleFilters = () => {};
  const clearFilters = () => {};

  return (
    <Card extra={'w-full h-full sm:overflow-auto px-6 mt-1'}>
      <div className="py-4 grid grid-cols-4 space-x-6">
        <div>
          <label
            for="plan"
            class="text-sm font-bold text-navy-700 dark:text-white"
          >
            Plano
          </label>
          <select
            id="plan"
            class=" mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
            placeholder="Selecione"
            value="Selecione"
          >
            <option value="all">Todos</option>
            {customerPlanOptions.map((option) => (
              <option className="dark:bg-gray-700" value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            for="service"
            class="text-sm font-bold text-navy-700 dark:text-white"
          >
            Serviço
          </label>
          <select
            id="service"
            class=" mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
          >
            <option value="all">Todos</option>
            {customerServiceOptions.map((option) => (
              <option className="dark:bg-gray-700" value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            for="status"
            class="text-sm font-bold text-navy-700 dark:text-white"
          >
            Status
          </label>
          <select
            id="status"
            class=" mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
          >
            <option value="all">Todos</option>
            <option value="ended">Vencido</option>
            <option value="working">Em progresso</option>
          </select>
        </div>
        <div>
          <label
            for="invoice"
            class="text-sm font-bold text-navy-700 dark:text-white"
          >
            Fatura
          </label>
          <select
            id="invoice"
            class=" mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
          >
            <option value="all">Todos</option>
            <option value="payed">Pago</option>
            <option value="pending">Pendente</option>
          </select>
        </div>
      </div>
      <div className="py-2 space-x-2">
        <button
          onClick={() => handleFilters()}
          className="linear rounded-xl bg-brand-500 px-5 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-700 active:bg-brand-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30"
        >
          Filtrar
        </button>
        <button
          onClick={() => clearFilters()}
          className="linear rounded-xl border-2 border-red-500 px-5 py-2 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10"
        >
          Limpar
        </button>
      </div>
    </Card>
  );
}
