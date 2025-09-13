import React from 'react';
import { Page } from '../types';
import Button from './common/Button';
import Card from './common/Card';
import Logo from './common/Logo';

interface MorePageProps {
  setPage: (page: Page) => void;
}

const MorePage: React.FC<MorePageProps> = ({ setPage }) => {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center min-h-screen justify-center animate-fade-in">
      <Logo className="mb-8" setPage={setPage} />
      <Card className="w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold mb-4 text-amber-300">
          عن التطبيق
        </h2>
        <p className="text-lg text-amber-100/80 leading-relaxed">
          تطبيق "الشريفة الصويرية للفلك" هو بوابتك لاستكشاف عوالم الفلك، التاروت، وعلم الأعداد بأسلوب عصري وموثوق. نحن نجمع بين المعرفة القديمة والتقنيات الحديثة لنقدم لك بصيرة وإلهامًا في رحلتك.
        </p>
        <div className="mt-8">
            <h3 className="text-2xl font-semibold text-amber-200">تواصل معنا</h3>
            <p className="mt-2 text-lg text-amber-100/80">contact@cherifa-falak.com</p>
        </div>
      </Card>
      <Button onClick={() => setPage(Page.HOME)} variant="secondary" className="mt-12">
        العودة إلى الرئيسية
      </Button>
    </div>
  );
};

export default MorePage;