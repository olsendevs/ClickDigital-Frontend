import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
function MessageTriggers() {
  return (
    <Accordion className="w-full" allowMultiple>
      <AccordionItem className="border-b border-gray-200 py-[17px] dark:!border-white/10">
        <h2>
          <AccordionButton className="flex justify-between">
            <span
              className="text-sm text-left font-bold text-navy-900 dark:text-white"
              flex="1"
              textAlign="left"
            >
              Gatilhos de menssagem
            </span>
            <AccordionIcon className="text-left !text-navy-900 dark:!text-white" />
          </AccordionButton>
        </h2>
        <AccordionPanel
          className="text-left text-teal-800 text-medium mt-2  dark:!text-white"
          pb={4}
        >
          {'{NOME} : Nome completo'}
          <br />
          {'{PRIMEIRO_NOME} : Primeiro Nome'}
          <br />
          {'{ZAP} : Whatsapp'}
          <br />
          {'{LOGIN} : Login'}
          <br />
          {'{SENHA} : Senha'}
          <br />
          {'{PLANO} : Plano'}
          <br />
          {'{PRODUTO} : Produto/Mensal'}
          <br />
          {'{OBS} : Observações'}
          <br />
          {'{PAGAMENTO} : Fatura'}
          <br />
          {'{DATA_VENCI} : Data de Vencimento'}
          <br />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default MessageTriggers;
