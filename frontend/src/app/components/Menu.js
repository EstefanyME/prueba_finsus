import Link from 'next/link';

const Menu = () => {
  return (
    <div className="w-64 h-screen bg-violet-800 text-white">
      <div className="flex justify-center items-center py-6 text-xl font-bold">
        <h1>Transacciones y usuarios</h1>
      </div>
      <ul className="space-y-4 p-4">
        <li>
          <Link
            href="/usuarios"
            className="block px-4 py-2 rounded hover:bg-violet-700"
          >
            Usuarios
          </Link>
        </li>
        <li>
          <Link
            href="/transacciones"
            className="block px-4 py-2 rounded hover:bg-violet-700"
          >
            Transacciones
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
