<template>
  <section class="py-24 font-sans overflow-hidden">
    <div class="container mx-auto px-6 max-w-300">
      <!-- Заголовок и подзаголовок -->
      <div class="mb-16">
        <h2
          class="text-renome text-[36px] font-bold uppercase mb-6 tracking-tight"
        >
          ТЕХНОЛОГИЧЕСКИЙ СТЭК
        </h2>
        <div
          class="max-w-4xl text-[#334155] text-[16px] leading-[1.6] space-y-4 font-light"
        >
          <p>
            Мы разрабатываем интеграционные решения и автоматизируем
            бизнес-процессы на базе Битрикс24. Создаем серверные приложения и
            API-сервисы, которые объединяют CRM, документы, задачи и
            бизнес-процессы в единую систему управления компанией.
          </p>
        </div>
      </div>

      <!-- Основной контент с карточками и кругом -->
      <div
        class="relative flex flex-col lg:flex-row items-center justify-between gap-12"
      >
        <!-- Левая карточка -->
        <div
          class="z-10 w-full lg:w-87.5 bg-white rounded-4xl p-8 shadow-sm border border-gray-100"
        >
          <p class="text-renome font-bold text-[15px] mb-6 leading-tight">
            Мы используем современные технологии для создания стабильных и
            масштабируемых решений:
          </p>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <span class="text-renome mt-1">■</span>
              <p class="text-[14px] text-gray-600">
                <strong class="text-black">Node.js</strong> — для
                высоконагруженных API-сервисов
              </p>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-renome mt-1">■</span>
              <p class="text-[14px] text-gray-600">
                <strong class="text-black">PHP</strong> — для разработки
                приложений и интеграций Битрикс24
              </p>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-renome mt-1">■</span>
              <p class="text-[14px] text-gray-600">
                <strong class="text-black">REST API и OAuth 2.0</strong> — для
                безопасного обмена данными
              </p>
            </li>
          </ul>
        </div>

        <!-- Центральный круг (Инфографика) -->
        <div
          class="relative w-full max-w-125 aspect-square flex items-center justify-center"
        >
          <!-- Сюда вставь скачанную картинку круга -->
          <img
            src="/TechStack.png"
            alt="Tech Circle"
            class="w-full h-full object-contain animate-pulse-slow"
          />
        </div>

        <!-- Правая карточка -->
        <div
          class="z-10 w-full lg:w-87.5 bg-white rounded-4xl p-8 shadow-sm border border-gray-100"
        >
          <p class="text-renome font-bold text-[15px] mb-6 leading-tight">
            Мы уделяем особое внимание защите данных:
          </p>
          <ul class="space-y-4 mb-8">
            <li class="flex items-start gap-3 text-[14px] text-gray-600">
              <span class="text-renome mt-1">■</span>
              Соединения защищены протоколом
              <strong class="text-black">HTTPS</strong>
            </li>
            <li class="flex items-start gap-3 text-[14px] text-gray-600">
              <span class="text-renome mt-1">■</span>
              Данные передаются в формате
              <strong class="text-black">JSON</strong>
            </li>
            <li class="flex items-start gap-3 text-[14px] text-gray-600">
              <span class="text-renome mt-1">■</span>
              Критическая информация шифруется на стороне сервера
            </li>
          </ul>
          <p
            class="text-[14px] text-black font-bold leading-relaxed border-t pt-6 border-gray-50"
          >
            Это позволяет автоматизировать процессы компании, снизить количество
            ручных операций и повысить эффективность работы команды.
          </p>
        </div>
      </div>

      <!-- Кнопка внизу -->
      <div class="mt-16">
        <button
          class="bg-renome-gradient text-white px-10 py-4 rounded-full flex items-center gap-6 group hover:bg-emerald-900 transition-all shadow-lg"
        >
          <span class="text-[12px] uppercase font-bold tracking-widest"
            >Оставить заявку</span
          >
          <div
            class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform"
          >
            →
          </div>
        </button>
      </div>
    </div>
  </section>
</template>
