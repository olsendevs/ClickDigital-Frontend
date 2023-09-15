import ReactLoading from 'react-loading';

export const Loading = ({ status }) => {
  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        status ? '' : 'hidden'
      } absolute flex h-full w-full items-center justify-center rounded-[20px] bg-white bg-opacity-80`}
    >
      <ReactLoading type={'spin'} color={'blue'} height={50} width={50} />
    </div>
  );
};
