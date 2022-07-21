import React, {memo} from 'react';

import styles from "./input.module.scss";

// eslint-disable-next-line react/display-name
const Input = React.forwardRef(({type="text",...rest}, ref) => (
    <input data-testid="text-input" ref={ref} className={styles.input} {...{type}} {...rest} />
  ));


export default memo(Input);

