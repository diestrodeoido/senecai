import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SenecAI - Continuando la conversación con Séneca',
  description: 'Cartas, Emails y sabiduría filosófica inspirada en Séneca para la vida moderna',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
