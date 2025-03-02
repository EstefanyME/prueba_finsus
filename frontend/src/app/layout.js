import Menu from './components/Menu';
import { ReactNode } from 'react';
import './globals.css'

export default function Layout({ children }) {
  return (
    <>
      <html lang="en">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <body className="flex">
          <Menu />
          <main className="flex-1 p-4">
            {children}
          </main>
        </body>
      </html>
    </>
  );
}
