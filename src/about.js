import './about.css'; // 소개 섹션 스타일이 필요할 경우

function About() {
  return (
    <section className="relative px-4 py-16 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 lg:py-32">
      <div className="flex flex-col lg:flex-row lg:-mx-8">
        <div className="w-full lg:w-1/2 lg:px-8">
          <h2 className="text-3xl leading-tight font-bold mt-4">Welcome to the Dentist Office of Dr. Thomas Dooley</h2>
          <p className="text-lg mt-4 font-semibold">Excellence in Dentistry in the Heart of NY</p>
          <p className="mt-2 leading-relaxed">Donec convallis sollicitudin facilisis. Integer nisl ligula, accumsan non tincidunt ac, imperdiet in enim.
            Donec efficitur ullamcorper metus, eu venenatis nunc. Nam eget neque tempus, mollis sem a, faucibus mi.</p>
        </div>

        <div className="w-full lg:w-1/2 lg:px-8 mt-12 lg:mt-0">
          <div className="md:flex">
            <div>
              <div className="w-16 h-16 bg-blue-600 rounded-full"></div>
            </div>
            <div className="md:ml-8 mt-4 md:mt-0">
              <h4 className="text-xl font-bold leading-tight">Everything You Need Under One Roof</h4>
              <p className="mt-2 leading-relaxed">Our comprehensive services allow you to receive all needed dental care
                right here in our state-of-art office – from dental cleanings and fillings to dental implants and extractions.</p>
            </div>
          </div>

          <div className="md:flex mt-8">
            <div>
              <div className="w-16 h-16 bg-blue-600 rounded-full"></div>
            </div>
            <div className="md:ml-8 mt-4 md:mt-0">
              <h4 className="text-xl font-bold leading-tight">Our Patient-Focused Approach</h4>
              <p className="mt-2 leading-relaxed">Your treatment plan will perfectly match your needs, lifestyle, and goals.
                Even if it’s been years since you last visited the dentist, we can help. Our comfortable office, compassionate team, and
                minimally-invasive treatments will help you feel completely at ease.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex md:flex-wrap mt-24 text-center md:-mx-4">
        <div className="md:w-1/2 md:px-4 lg:w-1/4">
          <div className="bg-white rounded-lg border border-gray-300 p-8">
            <img src="images/teeth-whitening.svg" alt="" className="h-20 mx-auto" />
            <h4 className="text-xl font-bold mt-4">Teeth Whitening</h4>
            <p className="mt-1">Let us show you how our experience.</p>
            <a href="#" className="block mt-4">Read More</a>
          </div>
        </div>

        <div className="md:w-1/2 md:px-4 mt-4 md:mt-0 lg:w-1/4">
          <div className="bg-white rounded-lg border border-gray-300 p-8">
            <img src="images/oral-surgery.svg" alt="" className="h-20 mx-auto" />
            <h4 className="text-xl font-bold mt-4">Oral Surgery</h4>
            <p className="mt-1">Let us show you how our experience.</p>
            <a href="#" className="block mt-4">Read More</a>
          </div>
        </div>

        <div className="md:w-1/2 md:px-4 mt-4 md:mt-8 lg:mt-0 lg:w-1/4">
          <div className="bg-white rounded-lg border border-gray-300 p-8">
            <img src="images/painless-dentistry.svg" alt="" className="h-20 mx-auto" />
            <h4 className="text-xl font-bold mt-4">Painless Dentistry</h4>
            <p className="mt-1">Let us show you how our experience.</p>
            <a href="#" className="block mt-4">Read More</a>
          </div>
        </div>

        <div className="md:w-1/2 md:px-4 mt-4 md:mt-8 lg:mt-0 lg:w-1/4">
          <div className="bg-white rounded-lg border border-gray-300 p-8">
            <img src="images/periodontics.svg" alt="" className="h-20 mx-auto" />
            <h4 className="text-xl font-bold mt-4">Periodontics</h4>
            <p className="mt-1">Let us show you how our experience.</p>
            <a href="#" className="block mt-4">Read More</a>
          </div>
        </div>
      </div>
    </section>
  );
}


export default About;
