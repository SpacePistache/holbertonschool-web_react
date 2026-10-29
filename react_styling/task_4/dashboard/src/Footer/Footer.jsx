import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer() {
  return (
    <div className="App-footer mt-auto border-t-[3px] border-(--main-color) p-5 text-center italic text-base max-[520px]:text-sm">
      <p>{`Copyright ${getCurrentYear()} - ${getFooterCopy(false)}`}</p>
    </div>
  );
}

export default Footer;
