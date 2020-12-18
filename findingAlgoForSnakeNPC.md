# Finding an algorithm for snakeNPC


## Nearest Neighbor Search

    My previous attempt was a naive implementation of the nearest neighbor search; I could improve it be tracking just the closest instead of using a object to track all distances. Determining the nearest neighbor with my solution was O(n) to computer distances for all points and O(n) to compute the minimum (not needed if we track just the closest instead of all distances).

        Took some time to look into a variant of it, kNN, which forms the base for one of the simplest ML algos according to Patrick Winston [(Intro to ML nearest neighbor lecture)](https://www.youtube.com/watch?v=09mb78oiPkA&ab_channel=MITOpenCourseWare). 
        
    I could use an approximation approach to this by implementing a projected spiral search pattern.

## Point Location
    Solved with:
    - Trapezoidal Map
    - Voronoi Diagram 
        - using Fortune's algorithm to do a plane sweep
    - Delaunay Triangulations/Algorithms
        - Flip algorithms
        - Incremental
        - Divide and conquer
        - Sweepline
    - k-dimensional tree (binary space partitioning)

# Sources
- https://stackoverflow.com/questions/1901139/closest-point-to-a-given-point
- https://en.wikipedia.org/wiki/Nearest_neighbor_search
- https://en.wikipedia.org/wiki/Point_location
