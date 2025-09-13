import React from 'react';
import { Page } from '../types';
import Logo from './common/Logo';
import Button from './common/Button';

interface HomePageProps {
  setPage: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setPage }) => {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center min-h-screen justify-center animate-fade-in space-y-10">
      <Logo />
      <nav>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <li>
            <Button onClick={() => setPage(Page.TAROT)} className="w-64 text-lg">
              قراءة التاروت
            </Button>
          </li>
          <li>
            <Button onClick={() => setPage(Page.HOROSCOPE)} className="w-64 text-lg">
              الأبراج
            </Button>
          </li>
          <li>
            <Button onClick={() => setPage(Page.NUMEROLOGY)} className="w-64 text-lg">
              علم الأعداد
            </Button>
          </li>
          <li>
            <Button onClick={() => setPage(Page.COMPATIBILITY)} className="w-64 text-lg">
              التوافق
            </Button>
          </li>
          <li>
            <Button onClick={() => setPage(Page.PRIVATE_READING)} className="w-64 text-lg">
              للقراءة الخاصة
            </Button>
          </li>
          <li>
             <Button onClick={() => setPage(Page.MORE)} className="w-64 text-lg">
                المزيد
             </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;