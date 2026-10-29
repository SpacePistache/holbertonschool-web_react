import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer() {
  return (
    <div className="App-footer mt-auto border-t-[3px] border-(--main-color) p-2 text-center italic text-base">
      <p>{`Copyright ${getCurrentYear()} - ${getFooterCopy(false)}`}</p>
    </div>
  );
}

export default Footer;
