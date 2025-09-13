import React from 'react';
import { Page } from '../types';
import Button from './common/Button';
import Card from './common/Card';
import Logo from './common/Logo';

interface PrivateReadingPageProps {
  setPage: (page: Page) => void;
}

const PrivateReadingPage: React.FC<PrivateReadingPageProps> = ({ setPage }) => {
  const whatsappLink = "https://wa.me/+212649427892";

  return (
    <div className="container mx-auto p-4 flex flex-col items-center min-h-screen justify-center animate-fade-in">
      <Logo className="mb-8" setPage={setPage} />
      <Card className="w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold mb-4 text-amber-300">
          قراءة خاصة بالتاروت المغربي
        </h2>
        <p className="text-lg text-amber-100/80 leading-relaxed">
          اكتشف مستقبلك واحصل على إجابات لأسئلتك مع قراءة خاصة ومفصلة باستخدام أوراق التاروت المغربية الأصيلة. تقدم لكم الشريفة الصويرية جلسات فردية عبر مكالمة صوتية على واتساب، حيث توفر لكم بصيرة عميقة وإرشادات شخصية لمساعدتكم في مختلف جوانب حياتكم العاطفية والمهنية والروحية. كل جلسة تتم بسرية تامة وبسعر مناسب.
        </p>
        <div className="mt-8">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button className="w-full text-lg">
                احجز قراءتك الآن عبر واتساب
              </Button>
            </a>
        </div>
      </Card>
      <Button onClick={() => setPage(Page.HOME)} variant="secondary" className="mt-12">
        العودة إلى الرئيسية
      </Button>
    </div>
  );
};

export default PrivateReadingPage;