
import './test.css'; // 추천사 섹션 스타일이 필요할 경우

function Test() {
  return (
    <section id="testimonials" className="bg-gray-100 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 py-16 lg:py-32">
      <div className="flex flex-col lg:flex-row lg:-mx-8">
        <div className="w-full lg:w-1/2 lg:px-8">
          <h2 className="text-3xl leading-tight font-bold mt-4">What Our Patients Say</h2>
          <p className="mt-4 leading-relaxed">
            “Best dental care I’ve ever received. Highly recommend!”
          </p>
          <p className="mt-2 leading-relaxed">
            “Professional, friendly, and excellent results.”
          </p>
        </div>

        <div className="w-full md:max-w-md md:mx-auto lg:w-1/2 lg:px-8 mt-12 lg:mt-0">
          <div className="bg-gray-400 w-full h-72 rounded-lg"></div>

          <p className="italic text-sm mt-2 text-center">Aenean ante nisi, gravida non mattis semper.</p>
        </div>
      </div>
    </section>
  );
}


export default Test;
