class node {
  constructor(location, distance) {
    this.location = location; // xy coordinates
    this.distance = distance; // sum of distance to head-node and food-node
  }
}


/** Tracks priority using a min-heap */
// sort by lowest distance
class Frontier {

  constructor() {
    // starts the heap with null at 0th
    this.heap = [null]; 
  }

  getMin() {
    return this.heap[1];
  }

  insert(node) {
    this.heap.push(node); // add to end

    // find the right place for new node 
    if (this.heap.length > 1) {
      let curr = this.heap.length - 1

      // compare to parent node (aka i/2), swap if needed
      while (curr > 1 && this.heap[Math.floor(current/2)] > this.heap[current] ) {
        [this.heap[Math.floor(curr / 2)], this.heap[curr]] = [this.heap[curr], this.heap[Math.floor(curr / 2)]]
        curr = Math.floor(curr / 2)
      }
    }
  }

  remove() {
    
  }

  /** Returns the height of the heap*/
  height(n = this.size) {
    return Math.ceil( Math.log(n + 1) / Math.log(2) - 1 );
  }

  /** Returns the last element without removing*/

  peekMin ( current = this.root, last = this.root, longestLength = 1 ) {
    // go left then right
    // find the longest paths
    // if paths are equal, prefer to keep the right as longest
    // return this.peekLowest(current, furthest, longestLength)
  }

  /** Returns the highest priority point without removing */
  peekMax () {
    return this.root;
  }

  insert ( node, distanceFromHead ) {
    // find the next open spot by BT order
    // add node as last element
    // bubble up
  }

  heapify () {
    // repeat until no more children
    // compare priority to children's priority
    // swap with child the highest child
  }

  
}

// class linkedlist {
//   constructor() {
//     this.head = null;
//     this.tail = null;
//   }

//   push (v, p) {
//     let newNode = new Node (v , p)

//     if (this.head === null) {
//       this.head = newNode;
//       this.tail = newNode;
//     } else {
//       // if p less than or equal to front's priority, insert at front
//       if (p <= this.head.p) {
//         newNode.right= this.head;
//         this.head.left= newNode
//         this.head = newNode;
//       } 
//       // if p greater than tail, insert at end
//       else if (p > this.tail) {
//         newNode.left= this.tail;
//         this.tail.right= newNode;
//         this.tail = newNode;
//       } 
//       // handle all else
//       else {
//         current = this.head.next;

//         // find position to insert along q
//         while (current.priority > p) {
//           current = current.next
//         }

//         newNode.right= current;
//         newNode.left= current.prev.next;
//         current.prev.right= newNode;
//         current.left= newNode;
//       }
//     }

//   }

//   /** Checks if list is empty */
//   isEmpty () {
//     return (this.head === null)
//   }

//   /** Removes lowest priority element */

//   static pop() {
//     let lowestP = this.head;

//     this.head = this.head.next;
//     if (!this.head) {
//       this.tail = null
//     } else {
//       this.head.left= null;
//     }

//     return lowestP;
//   }

//   /** Returns value of the lowest priority element without removing it */
//   static peekLow() {
//     let value = this.head.value;
//     let priority = this.head.priority;

//     return {value, priority};
//   }

//   /** Returns value of the highest priority element without removing it */
//   static peekHigh () {
//     let value = this.tail.value;
//     let priority = this.tail.priority;

//     return { value, priority };
//   }
// }



module.export({Frontier})