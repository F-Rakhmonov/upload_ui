import React from 'react';
import { ArrowLeftIcon, DownloadIcon, ShareIcon } from '../components/IconComponents';
import ReportSection from '../components/ReportSection';
import ScaleItemDisplay from '../components/ScaleItemDisplay';
import VisualProfileItemDisplay from '../components/VisualProfileItemDisplay';
import type { ReportScreenProps, ScaleItem, VisualProfileItem } from '../types';

const calculateAge = (dob: string): number | string => {
  if (!dob) return "N/A";
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 0 ? age : "N/A";
};

const ReportScreen: React.FC<ReportScreenProps> = ({ childFormData, onPreviousStep }) => {
  const age = calculateAge(childFormData.dob);
  const childName = childFormData.childName || "ребенка";

  const scalesData: ScaleItem[] = [
    { label: "Эмоциональная зрелость", score: 1, maxScore: 6 },
    { label: "Социальная адаптация", score: 1, maxScore: 6 },
    { label: "Самооценка", score: 1, maxScore: 2 },
    { label: "Креативность", score: 1, maxScore: 2 },
    { label: "Самозащита", score: 1, maxScore: 1 },
  ];

  const visualProfileData: VisualProfileItem[] = [
    { label: "Эмоц. устойчивость", value: 7, total: 10 },
    { label: "Соц. адаптация", value: 5, total: 10 },
    { label: "Самокритичность", value: 8, total: 10 },
    { label: "Критическая важность", value: 3, total: 10 }, // Assuming "Критическая важность" from image, though text is small. Could be "Креативность" or similar
    { label: "Самозащита", value: 6, total: 10 },
  ];


  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl">
      <header className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          Психологический отчёт о ребёнке {childName} ({age} {typeof age === 'number' ? (age === 1 ? 'год' : (age > 1 && age < 5) ? 'года' : 'лет') : ''})
        </h1>
      </header>

      <main className="border-2 border-green-500 p-4 sm:p-6 rounded-lg space-y-6 text-sm sm:text-base text-slate-700">
        <ReportSection title="Краткое описание">
          <p><strong>Имя ребёнка:</strong> {childFormData.childName || "Не указано"}</p>
          <p><strong>Возраст:</strong> {age} {typeof age === 'number' ? (age === 1 ? 'год' : (age > 1 && age < 5) ? 'года' : 'лет') : 'Не указан'}</p>
          <p><strong>Пол:</strong> {childFormData.gender === 'male' ? 'Мужской' : childFormData.gender === 'female' ? 'Женский' : 'Не указан'}</p>
          <p className="mt-2">Представленный отчет содержит анализ данных, полученных в ходе заполнения анкеты родителем ({childFormData.parentName || 'Не указано'}) и интерпретации рисуночных тестов.</p>
        </ReportSection>
        
        <ReportSection title="Общие выводы">
          <p>***Анализ рисунка "Дом":*** {childFormData.q_drawing_house || "Часто свидетельствует о потребности в стабильности, защищенности и семейном благополучии."}</p>
          <p>***Описание черт(дерево) "Я-концепция":*** {childFormData.q_drawing_tree || "Воображение и наблюдательность."}</p>
          <p>***Самооценка (автопортрет):*** {childFormData.q_drawing_self || "Склонность к самоконтролю, стремление к одобрению со стороны взрослых."}</p>
        </ReportSection>

        <ReportSection title="Раздел 1. Рисуночные тесты">
            <h4 className="font-semibold text-slate-800 mb-2">РИС. 1. Дом, дерево, человек: основные наблюдения</h4>
            <p><strong>Элемент | Особенности рисунка | Психологический вывод</strong></p>
            <hr className="my-1"/>
            <p><strong>Дом:</strong> {childFormData.obs_house_features || "Неполный, с открытыми дверями, без окон."} | {childFormData.obs_house_psych || "Потребность в безопасности, связи с семьей."}</p>
            <p><strong>Дерево:</strong> {childFormData.obs_tree_features || "С тонкими, гнущимися ветвями."} | {childFormData.obs_tree_psych || "Гибкость, рост, возможная незрелость."}</p>
            <p><strong>Человек:</strong> {childFormData.obs_person_features || "Маленький, руки прижаты, без эмоций."} | {childFormData.obs_person_psych || "Сдержанность, неуверенность, сложность."}</p>
            <p className="mt-2"><strong>Общий вывод:</strong> Ребёнок чувствует себя в семье защищённо, но может быть склонен к подавлению эмоций, существует неуверенность в социальной среде.</p>
        </ReportSection>

        <ReportSection title="РИС. 2. Животное: детали и фантазия">
            <p>***Выбор животного:*** {childFormData.q_drawing_animal_choice || "Фантастическое или символическое существо (например, легко прыгающее)."}</p>
            <p>***Акценты в рисунке:*** {childFormData.q_drawing_animal_details || "Большие глаза, уши – важность наблюдения, осторожность."}</p>
            <p>***Поза и выражение:*** {childFormData.q_drawing_animal_pose || "Мирное выражение, открытая поза – доброжелательность."}</p>
            <p className="mt-2"><strong>Вывод:</strong> У ребёнка хорошо развито воображение, он склонен к рефлексии и наблюдательности. Может выражать активные эмоции, предпочитая эмпатию.</p>
        </ReportSection>

        <ReportSection title="РИС. 3. Автопортрет: особенности самовосприятия">
            <p>***Размер фигуры:*** {childFormData.q_selfportrait_size || "Маленький – возможно заниженная самооценка."}</p>
            <p>***Выражение лица:*** {childFormData.q_selfportrait_expression || "Нейтральное или отсутствуют – сдержанность."}</p>
            <p>***Дополнительные детали:*** {childFormData.q_selfportrait_details || "Нет фона или окружения образом – неуверенность и замкнут."}</p>
            <p className="mt-2"><strong>Вывод:</strong> Ребёнок уделяет внимание на внешнюю оценку, нуждается в поддержке, особенно эмоциональной и словесной.</p>
        </ReportSection>

        <ReportSection title="Раздел 2. Сводные шкалы и профиль">
            <h4 className="font-semibold text-slate-800 mb-3">Шкалы (в баллах из ХХ):</h4>
            <div className="space-y-2 mb-4">
                {scalesData.map(item => <ScaleItemDisplay key={item.label} {...item} />)}
            </div>
            
            <h4 className="font-semibold text-slate-800 mb-3 mt-6">Визуальный профиль (ключи):</h4>
            <div className="space-y-2">
                {visualProfileData.map(item => <VisualProfileItemDisplay key={item.label} {...item} />)}
            </div>
        </ReportSection>

        <ReportSection title="Раздел 3. Рекомендации для родителей">
          <p>Чаще хвалите ребёнка за конкретные действия, а не только за результат.</p>
          <p>Помогайте называть чувства: "Ты расстроен(а), потому что...".</p>
          <p>Поддерживайте инициативу, даже если ребёнок ошибается.</p>
          <p>Создавайте спокойную и принимающую атмосферу дома.</p>
          <p>Поощряйте фантазию с помощью рисунка, игры по ролям.</p>
          <hr className="my-3"/>
          <p className="italic">Очень внимательно следите за эмоциональным состоянием и поведением ребёнка. Личные консультации для полной поддержки ребенка в развитии.</p>
        </ReportSection>

      </main>

      <footer className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-slate-200">
        <span className="text-sm text-slate-500 mb-4 sm:mb-0 order-1 sm:order-none">Шаг 3/3</span>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onPreviousStep}
            className="w-full sm:w-auto font-medium py-2.5 px-5 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors duration-150 border border-blue-600"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Назад к анкете
          </button>
           <button
            type="button"
            onClick={() => alert('Функция "Скачать PDF" еще не реализована.')}
            className="w-full sm:w-auto font-medium py-2.5 px-5 rounded-lg flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-150"
          >
            <DownloadIcon className="w-5 h-5 mr-2" />
            Скачать PDF
          </button>
          <button
            type="button"
            onClick={() => alert('Функция "Поделиться" еще не реализована.')}
            className="w-full sm:w-auto font-medium py-2.5 px-5 rounded-lg flex items-center justify-center bg-slate-600 hover:bg-slate-700 text-white transition-colors duration-150"
          >
            <ShareIcon className="w-5 h-5 mr-2" />
            Поделиться
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ReportScreen;