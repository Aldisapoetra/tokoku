export default function Button({ children, onClick = () => {}, bg = "green" }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg ${bg} px-4 py-2 text-white duration-300 hover:cursor-pointer`}
    >
      {children}
    </button>
  );
}
