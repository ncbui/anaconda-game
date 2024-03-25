class node {
  constructor(location, distance) {
    this.location = location; // xy coordinates
    this.distance = distance; // sum of distance to head-node and food-node
  }
}


/** Tracks priority using a min-heap */
// sort ASC by distance
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
}


module.export({Frontier})