import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer() {
  return (
    <div className="App-footer mt-auto border-t-[3px] border-(--main-color) p-5 text-center italic">
      <p>{`Copyright ${getCurrentYear()} - ${getFooterCopy(true)}`}</p>
    </div>
  );
}

export default Footer;
