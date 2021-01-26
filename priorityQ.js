class node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
    this.next = null;
    this.prev = null;
  }
}

class linkedlist {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  push (v, p) {
    let newNode = new Node (v , p)

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // if p less than or equal to front's priority, insert at front
      if (p <= this.head.p) {
        newNode.next = this.head;
        this.head.prev = newNode
        this.head = newNode;
      } 
      // if p greater than tail, insert at end
      else if (p > this.tail) {
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
      } 
      // handle all else
      else {
        current = this.head.next;

        // find position to insert along q
        while (current.priority > p) {
          current = current.next
        }

        newNode.next = current;
        newNode.prev = current.prev.next;
        current.prev.next = newNode;
        current.prev = newNode;
      }
    }

  }

  /** Checks if list is empty */
  isEmpty () {
    return (this.head === null)
  }

  /** Removes lowest priority element */

  static pop() {
    let lowestP = this.head;

    this.head = this.head.next;
    if (!this.head) {
      this.tail = null
    } else {
      this.head.prev = null;
    }

    return lowestP;
  }

  /** Returns value of the lowest priority element without removing it */
  static peekLow() {
    let value = this.head.value;
    let priority = this.head.priority;

    return {value, priority};
  }

  /** Returns value of the highest priority element without removing it */
  static peekHigh () {
    let value = this.tail.value;
    let priority = this.tail.priority;

    return { value, priority };
  }
}

class priorityQ {

  constructor() {
    this.items = [];
  }

  // enqueue (item, priority)
  // dequeue() // removes it with highest priority
  // front()
  // poll() // return top priority item and dequeues it
  // peek() // return highest item without remove
  // isEmpty()  // return T/F
  // printPQ()

  // keeping sorted, add at right place, top priority first

}


module.export({linkedlist, priorityQ})