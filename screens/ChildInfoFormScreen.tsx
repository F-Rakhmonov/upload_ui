import React, { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, DocumentTextIcon, FlagIcon } from '../components/IconComponents';
import FormSection from '../components/FormSection';
import TextInput from '../components/TextInput';
import RadioGroup from '../components/RadioGroup';
import TextareaInput from '../components/TextareaInput';
import type { ChildInfoFormScreenProps, ChildFormData, RadioOption } from '../types';

const initialFormData: ChildFormData = {
  childName: '',
  dob: '',
  gender: '',
  parentName: '',
  q1_1: '', q1_2: '', q1_3: '', q1_4: '',
  q2_1: '', q2_2: '', q2_3: '',
  q3_1: '', q3_2: '', q3_3: '',
  q4_1: '', q4_2: '', q4_3: '',
  generalEmotionalState: '',
  behavioralFeatures: '',
  strengthsWeaknesses: '',
  developmentConcerns: '',
  specialistConsultation: '',
};

const frequencyOptions: RadioOption[] = [
  { label: 'Очень редко', value: 'very_rarely' },
  { label: 'Редко', value: 'rarely' },
  { label: 'Иногда', value: 'sometimes' },
  { label: 'Часто', value: 'often' },
  { label: 'Всегда', value: 'always' },
];

const likertOptions: RadioOption[] = [
    { label: 'Отлично', value: 'excellent'},
    { label: 'Хорошо', value: 'good'},
    { label: 'Удовлетворительно', value: 'satisfactory'},
    { label: 'Неудовлетворительно', value: 'poor'},
    { label: 'Очень плохо', value: 'very_poor'},
];


const ChildInfoFormScreen: React.FC<ChildInfoFormScreenProps> = ({ onNextStep, onPreviousStep }) => {
  const [formData, setFormData] = useState<ChildFormData>(initialFormData);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return Object.keys(initialFormData).every(key => {
        const value = formData[key];
        return typeof value === 'string' && value.trim() !== '';
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttemptedSubmit(true);
    
    if (isFormValid()) {
      console.log('Form Data:', formData);
      onNextStep(formData);
    } else {
        alert('Пожалуйста, заполните все обязательные поля.');
        // Focus the first invalid field
        const firstEmptyFieldKey = Object.keys(initialFormData).find(key => formData[key].trim() === '');
        if (firstEmptyFieldKey) {
            const element = document.getElementsByName(firstEmptyFieldKey)[0] as HTMLElement;
            element?.focus();
        }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <div>
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">Общая информация о ребенке</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <TextInput label="Имя ребенка" name="childName" value={formData.childName} onChange={handleChange} required 
                     aria-invalid={attemptedSubmit && !formData.childName.trim()} />
          <TextInput label="Дата рождения ребенка" name="dob" type="date" value={formData.dob} onChange={handleChange} placeholder="дд.мм.гггг" required 
                     aria-invalid={attemptedSubmit && !formData.dob.trim()} />
        </div>
        <RadioGroup
          label="Пол ребенка"
          name="gender"
          options={[{ label: 'Мужской', value: 'male' }, { label: 'Женский', value: 'female' }]}
          selectedValue={formData.gender}
          onChange={(name, value) => handleRadioChange(name, value)}
          required
          className={attemptedSubmit && !formData.gender ? 'border-pink-500 border rounded-md p-2' : ''}
        />
        <div className="mt-6">
            <TextInput label="Имя родителя, заполняющего анкету" name="parentName" value={formData.parentName} onChange={handleChange} required 
                       aria-invalid={attemptedSubmit && !formData.parentName.trim()} />
        </div>
      </div>

      <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-lg flex items-start space-x-3">
        <DocumentTextIcon className="w-6 h-6 text-rose-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm">
          Пожалуйста, максимально внимательно прочитайте каждый вопрос и выберите наиболее подходящий вариант ответа, отражающий поведение/состояние вашего ребенка в последние 2-4 недели. Описывайте поведение своего и здорового ребенка так, как если бы он уже умел разговаривать и самостоятельно рисовал бы вашего ребенка.
        </p>
      </div>
      <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-lg flex items-center space-x-3">
        <FlagIcon className="w-5 h-5 text-rose-500 flex-shrink-0" />
        <p className="text-sm font-medium">Все вопросы обязательны к заполнению</p>
      </div>

      <FormSection title="Раздел 1. Эмоциональная сфера">
        <RadioGroup label="Ребенок часто выражает радость и удовольствие:" name="q1_1" options={frequencyOptions} selectedValue={formData.q1_1} onChange={handleRadioChange} required className={attemptedSubmit && !formData.q1_1 ? 'border-pink-500 border rounded-md p-2' : ''}/>
        <RadioGroup label="Ребенок часто выглядит грустным и удрученным:" name="q1_2" options={frequencyOptions} selectedValue={formData.q1_2} onChange={handleRadioChange} required className={attemptedSubmit && !formData.q1_2 ? 'border-pink-500 border rounded-md p-2' : ''}/>
        <RadioGroup label="Ребенок часто грустит или плачет без видимой причины:" name="q1_3" options={frequencyOptions} selectedValue={formData.q1_3} onChange={handleRadioChange} required className={attemptedSubmit && !formData.q1_3 ? 'border-pink-500 border rounded-md p-2' : ''}/>
        <RadioGroup label="Ребенок легко возбудим, его настроение часто меняется:" name="q1_4" options={frequencyOptions} selectedValue={formData.q1_4} onChange={handleRadioChange} required className={attemptedSubmit && !formData.q1_4 ? 'border-pink-500 border rounded-md p-2' : ''}/>
      </FormSection>

      <FormSection title="Раздел 2. Социальное взаимодействие">
        <RadioGroup label="Ребенок легко заводит друзей:" name="q2_1" options={frequencyOptions} selectedValue={formData.q2_1} onChange={handleRadioChange} required className={attemptedSubmit && !formData.q2_1 ? 'border-pink-500 border rounded-md p-2' : ''}/>
        <RadioGroup label="Ребенок предпочитает играть один и не с другими детьми:" name="q2_2" options={frequencyOptions} selectedValue={formData.q2_2} onChange={handleRadioChange} required className={attemptedSubmit && !formData.q2_2 ? 'border-pink-500 border rounded-md p-2' : ''}/>
        <RadioGroup label="Ребенок проявляет эмпатию к другим (сочувствует, старается помочь):" name="q2_3" options={frequencyOptions} selectedValue={formData.q2_3} onChange={handleRadioChange} required className={attemptedSubmit && !formData.q2_3 ? 'border-pink-500 border rounded-md p-2' : ''}/>
      </FormSection>
      
      <FormSection title="Раздел 3. Саморегуляция и поведение">
        <RadioGroup label="Ребенок умеет следовать правилам и инструкциям:" name="q3_1" options={frequencyOptions} selectedValue={formData.q3_1} onChange={handleRadioChange} required className={attemptedSubmit && !formData.q3_1 ? 'border-pink-500 border rounded-md p-2' : ''}/>
        <RadioGroup label="Ребенку трудно контролировать свои импульсы (например, перебивает, не может дождаться своей очереди):" name="q3_2" options={frequencyOptions} selectedValue={formData.q3_2} onChange={handleRadioChange} required className={attemptedSubmit && !formData.q3_2 ? 'border-pink-500 border rounded-md p-2' : ''}/>
        <RadioGroup label="Ребенок часто проявляет упрямство, отказывается сотрудничать:" name="q3_3" options={frequencyOptions} selectedValue={formData.q3_3} onChange={handleRadioChange} required className={attemptedSubmit && !formData.q3_3 ? 'border-pink-500 border rounded-md p-2' : ''}/>
      </FormSection>

      <FormSection title="Раздел 4. Самооценка и уверенность в себе">
        <RadioGroup label="Ребенок уверен в своих силах и способностях:" name="q4_1" options={frequencyOptions} selectedValue={formData.q4_1} onChange={handleRadioChange} required className={attemptedSubmit && !formData.q4_1 ? 'border-pink-500 border rounded-md p-2' : ''}/>
        <RadioGroup label="Ребенок часто сомневается в себе, нуждается в постоянном одобрении:" name="q4_2" options={frequencyOptions} selectedValue={formData.q4_2} onChange={handleRadioChange} required className={attemptedSubmit && !formData.q4_2 ? 'border-pink-500 border rounded-md p-2' : ''}/>
        <RadioGroup label="Ребенок легко расстраивается из-за неудач, боится пробовать новое:" name="q4_3" options={frequencyOptions} selectedValue={formData.q4_3} onChange={handleRadioChange} required className={attemptedSubmit && !formData.q4_3 ? 'border-pink-500 border rounded-md p-2' : ''}/>
      </FormSection>

      <FormSection title="Раздел 5. Общие вопросы">
        <RadioGroup label="Как Вы оцениваете общее эмоциональное состояние вашего ребенка?" name="generalEmotionalState" options={likertOptions} selectedValue={formData.generalEmotionalState} onChange={handleRadioChange} required className={attemptedSubmit && !formData.generalEmotionalState ? 'border-pink-500 border rounded-md p-2' : ''}/>
        <TextareaInput label="Есть ли у Вашего ребенка какие-либо особенности развития или поведения, о которых Вы бы хотели сообщить дополнительно?" name="behavioralFeatures" value={formData.behavioralFeatures} onChange={handleChange} rows={3} required aria-invalid={attemptedSubmit && !formData.behavioralFeatures.trim()} />
        <TextareaInput label="Какие, на Ваш взгляд, сильные стороны и таланты есть у Вашего ребенка?" name="strengthsWeaknesses" value={formData.strengthsWeaknesses} onChange={handleChange} rows={3} required aria-invalid={attemptedSubmit && !formData.strengthsWeaknesses.trim()} />
        <TextareaInput label="Какие, на Ваш взгляд, области требуют особого внимания и развития у Вашего ребенка?" name="developmentConcerns" value={formData.developmentConcerns} onChange={handleChange} rows={3} required aria-invalid={attemptedSubmit && !formData.developmentConcerns.trim()} />
        <TextareaInput label="Обращались ли Вы ранее к специалистам (психологу, неврологу, логопеду) по поводу развития или поведения Вашего ребенка? Если да, то к кому и с каким результатом?" name="specialistConsultation" value={formData.specialistConsultation} onChange={handleChange} rows={3} required aria-invalid={attemptedSubmit && !formData.specialistConsultation.trim()} />
      </FormSection>


      <footer className="flex flex-col sm:flex-row justify-between items-center mt-10 pt-6 border-t border-slate-200">
        <span className="text-sm text-slate-500 mb-4 sm:mb-0">Шаг 2/3</span>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <button
            type="button"
            onClick={onPreviousStep}
            className="w-full sm:w-auto font-medium py-2.5 px-6 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors duration-150 border border-blue-600"
            >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            К загрузке рисунков
            </button>
            <button
            type="submit"
            className="w-full sm:w-auto font-medium py-2.5 px-6 rounded-lg flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-150"
            >
            Узнать результаты
            <ArrowRightIcon className="w-5 h-5 ml-2" />
            </button>
        </div>
      </footer>
    </form>
  );
};

export default ChildInfoFormScreen;