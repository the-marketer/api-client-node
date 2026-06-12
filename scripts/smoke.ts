/**
 * Optional smoke test — requires THEMARKETER_CUSTOMER_ID and THEMARKETER_REST_KEY.
 */
import { Client } from '../src/client';

const customerId = process.env.THEMARKETER_CUSTOMER_ID;
const restKey = process.env.THEMARKETER_REST_KEY;

if (!customerId || !restKey) {
  console.error('Set THEMARKETER_CUSTOMER_ID and THEMARKETER_REST_KEY');
  process.exit(1);
}

const client = new Client({ customerId, restKey });

const ok = await client.campaigns().list();
console.log('campaigns list:', ok);
