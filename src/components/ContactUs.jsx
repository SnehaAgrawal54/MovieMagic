import TopNav from './templates/TopNav';
import SideNav from './templates/SideNav';

const ContactUs = () => {
  document.title = "MovieMagic | Contact Us";

  return (
    <>
      <SideNav />
      <div className='w-[80%] h-full overflow-auto overflow-x-hidden'>
        <TopNav />

        <div className='h-[90vh] p-[10%] flex flex-col items-center bg-[#6556CD]  text-zinc-200'>
          <h1 className='text-6xl font-black p-10'>Contact Us</h1>
          <p className='text-lg leading-8 tracking-wide'>Need to get in touch.</p>
          <a href="mailto:your.snehagrwal@gmail.com">Email <i className="ri-mail-fill hover:text-white"></i>: snehagrawal121@gmail.com</a>
        </div>

      </div>
    </>
  )
}

export default ContactUs