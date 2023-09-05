import "../styles/components/footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNodeJs,
  faReact,
  faAws,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  faDatabase,
  faUser,
  faEnvelope,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

export function Footer() {
  return (
    <footer>
      <div className='footer__categories'>
        <div className='footer__category'>
          <h3>Tools</h3>
          <ul>
            <li>
              <span>
                <FontAwesomeIcon icon={faNodeJs} /> <span>Node</span>
              </span>
            </li>
            <li>
              <span>
                <FontAwesomeIcon icon={faReact} />
                <span>React</span>
              </span>
            </li>
            <li>
              <span>
                <FontAwesomeIcon icon={faDatabase} />
                <span>Postgres</span>
              </span>
            </li>
            <li>
              <span>
                <FontAwesomeIcon icon={faAws} />
                <span>AWS</span>
              </span>
            </li>
          </ul>
        </div>
        <div className='footer__category'>
          <h3>Social</h3>
          <ul>
            <li>
              <span>
                <FontAwesomeIcon icon={faLinkedin} />{" "}
                <a href='https://www.linkedin.com/in/jason-murphy-3704ba1b8/'>
                  Linkedin
                </a>
              </span>
            </li>
            <li>
              <span>
                <FontAwesomeIcon icon={faGithub} />
                <a href='https://github.com/jmurphy1196'>Github</a>
              </span>
            </li>
            <li>
              <span>
                <FontAwesomeIcon icon={faUser} />
                <a href='https://my-portfolio-mfu7ulh22-jmurphy1196.vercel.app/'>
                  Portfolio
                </a>
              </span>
            </li>
          </ul>
        </div>
        <div className='footer__category'>
          <h3>Project</h3>
          <ul>
            <li>
              <span>
                <FontAwesomeIcon icon={faGithub} />{" "}
                <a href='https://github.com/jmurphy1196/Pangaea-prime'>Repo</a>
              </span>
            </li>
            <li>
              <span>
                <FontAwesomeIcon icon={faQuestion} /> <a href=''>About</a>
              </span>
            </li>
          </ul>
        </div>
        <div className='footer__category'>
          <h3>Let's get in touch</h3>
          <ul>
            <li>
              <span>
                <FontAwesomeIcon icon={faEnvelope} />{" "}
                <a href='https://my-portfolio-mfu7ulh22-jmurphy1196.vercel.app/contact'>
                  Contact Me
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <span className='copy'>
        This project uses likeness and images from Amazon. No copyright
        intended.
      </span>
    </footer>
  );
}
