import { useContext } from 'react';
import { getCurrentYear, getFooterCopy } from '../utils/utils';
import newContext from '../Context/context';

function Footer() {
  const { user } = useContext(newContext);

  return (
    <div className="App-footer mt-auto border-t-[3px] border-(--main-color) p-2 text-center italic text-base">
      <p>{`Copyright ${getCurrentYear()} - ${getFooterCopy(false)}`}</p>
      {user.isLoggedIn && (
        <p>
          <a href="#">Contact us</a>
        </p>
      )}
    </div>
  );
}

export default Footer;
