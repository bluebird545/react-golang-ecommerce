import React, {useState, useRef} from 'react';
import {RouteProps} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import {combineClasses} from '@util';
import styles from './index.scss';

interface ContentElement<P = HTMLParagraphElement | HTMLUListElement> {
  props: P
}

interface IProps {
  title: string;
  content?: ContentElement | any;
}

type Props = RouteProps & IProps;

const Accordion = (props: Props) => {
  const { title, content } = props;
  const [accordionState, toggleAccordion] = useState(false);
  const [setHeight, setHeightState] = useState("0px");
  
  const accordionContent = useRef(null);

  const handleChecked = () => {
    toggleAccordion(!accordionState);
    setHeightState(
      accordionState ? "0px" : `${accordionContent.current.scrollHeight}px`
    );
  }


  return (
    <div>
      <div className={accordionState ? combineClasses(styles.accordion, styles.open) : combineClasses(styles.accordion, styles.close)}>
        <button className={styles.accordion__title} onClick={handleChecked}>
          {title}
          <span className={accordionState ? combineClasses(styles.chevron, styles.rotate) : styles.chevron}></span>
        </button>
        <div ref={accordionContent} className={styles.accordion__content} style={{ maxHeight: `${setHeight}`}}>
          <div className={accordionState ? combineClasses(styles.accordion__text, styles.expand) : styles.accordion__text}>
            {content}
          </div>
        </div>
      </div>
      
      {/* <div className="tabs"> */}
        {/* <div className="tab">
          <input type="checkbox" id="check1" onChange={handleChecked} />
          <label className="tab-label" htmlFor="check1">
            {tab.title}
          </label>
          <div className="tab-content">
            {tab.content ? tab.content : props.children}
          </div>
        </div> */}
        {/* <div className="tab">
          <input type="checkbox" id="check1" onChange={handleChecked} />
          <label className="tab-label" htmlFor="check1">
            Ingredients
          </label>
          <div className="tab-content">
            ingredients
          </div>
        </div> */}
        {/* <div className="tab">
          <input type="checkbox" id="check2" onChange={handleChecked} />
          <label className="tab-label" htmlFor="check2">
            How To Use
          </label>
          <div className="tab-content">
            instructions
          </div>
        </div> */}
      {/* </div> */}

    </div>
  );
};

export default Accordion;