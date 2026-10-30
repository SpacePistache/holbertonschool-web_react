import { getCurrentYear, getFooterCopy } from '../utils/utils';
import newContext from '../Context/context';

function Footer() {
  return (
    <newContext.Consumer>
      {({ user }) => (
        <div className="App-footer mt-auto border-t-[3px] border-(--main-color) p-2 text-center italic text-base">
          <p>{`Copyright ${getCurrentYear()} - ${getFooterCopy(false)}`}</p>
          {user.isLoggedIn && (
            <p>
              <a href="#">Contact us</a>
            </p>
          )}
        </div>
      )}
    </newContext.Consumer>
  );
}

export default Footer;
