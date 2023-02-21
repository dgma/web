
import Button from '@/libs/ui/Button';
import styles from './DemoForm.module.css';

const DemoForm = () => {
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>PIGMY/USDgm Vault</h3>
      <div className={styles.row}>
          <div className={styles.group}>
            <input type="number" placeholder="amount to deposit, PIGMY" className={styles.input}/>
            <Button className={styles.btn}>Deposit</Button>
          </div>
          <div className={styles.group}>
            <input type="number" placeholder="amount to withdraw, PIGMY" className={styles.input}/>
            <Button className={styles.btn}>Withdraw</Button>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.group}>
            <input type="number" placeholder="amount to mint, USDgm" className={styles.input}/>
            <Button className={styles.btn}>Mint</Button>
          </div>
          <div className={styles.group}>
            <input type="number" placeholder="amount to burn, USDgm" className={styles.input}/>
            <Button className={styles.btn}>Burn</Button>
          </div>
        </div>
    </div>
  )
};

export default DemoForm;