import nft1 from "assets/img/nfts/NftBanner1.png";
import { useNavigate } from 'react-router-dom';

const Banner1 = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('create');
  };
  return (
    <div
      className="flex w-full flex-col rounded-[20px] bg-cover px-[30px] py-[30px] md:px-[64px] md:py-[56px]"
      style={{ backgroundImage: `url(${nft1})` }}
    >
      <div className="w-full">
        <h4 className="mb-[14px] max-w-full text-xl font-bold text-white md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
          Build engaging polls to collect meaningful insights
        </h4>
        <p className="mb-[40px] max-w-full text-base font-medium text-[#E3DAFF] md:w-[64%] lg:w-[40%] xl:w-[72%] 2xl:w-[60%] 3xl:w-[45%]">
          Connect with your audience through tailored polls that deliver instant feedback. Design, distribute, and review results seamlessly!
        </p>

        <div className="mt-[36px] flex items-center">
          <button className="text-black linear rounded-xl bg-white px-4 py-2 text-center text-base font-medium transition duration-200 hover:!bg-white/80 active:!bg-white/70" onClick={handleNavigate}>
            Create Poll
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner1;