import './Footer.css';
import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer() {
  return (
    <div className="App-footer">
      <p>{`Copyright ${getCurrentYear()} ${getFooterCopy(false)}`}</p>
    </div>
  );
}

export default Footer;
