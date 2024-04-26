import TopNav from './templates/TopNav';
import SideNav from './templates/SideNav';

const AboutUs = () => {
  document.title = "MovieMagic | About Us";

  return (
    <>
      <SideNav />
      <div className='w-[80%] h-full overflow-auto overflow-x-hidden'>
        <TopNav />

        <div className='h-[90vh] p-[10%] flex flex-col items-center bg-[#6556CD]  text-zinc-200'>
          <h1 className='text-6xl font-black p-10'>About Us</h1>
          <p className='text-lg leading-8 tracking-wide'>The MovieMagic website provides a brief overview of the platform's mission, vision, and goals. It outlines the website's dedication to providing users with a comprehensive database of movies, TV shows, and related information. A summary of the website's main features and functionalities, showcasing its capabilities in terms of movie database, search options, user profiles, ratings, reviews, and community forums.Emphasis on the importance of user interaction and community participation, encouraging visitors to join discussions, contribute content, and share their movie experiences.Transparency regarding the sources of movie data used on the platform, ensuring users understand where information is sourced from and the reliability of the content.</p>
        </div>

      </div>
    </>
  )
}

export default AboutUs