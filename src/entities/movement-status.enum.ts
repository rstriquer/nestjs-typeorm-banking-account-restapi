export enum MovementStatusEnum {
  // The value has been received, but has not yet been checked.
  // - Ex: money received at an ATM;
  STARTED = 'Started',
  // The value was received and confirmed by a first-level attendant
  // - Ex: ATM operator;
  // - Ex: Transactions received through PIX operations
  RECEIVED = 'Received',
  // - The transaction was completely done;
  DONE = 'Done',
}
