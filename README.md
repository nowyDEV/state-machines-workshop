# State machines with XState

## Notes

- Usage of many boolean flags in the code greatly increases complexity (Combinatorial explosion)
- The code is prone to errors and difficult to reason about & test
- There is no control over transitions between various states of the component
- **State machine** pattern can be useful to solve those problems
- There are many libraries that implement this pattern e.g.
  - [XState](https://xstate.js.org/) -> most popular one, well maintained & documented
  - [Robot](https://thisrobot.life/) -> small & functional alternative

## Additional resources

- [Combinatorial Explosion](https://gist.github.com/CMCDragonkai/8a7f4b2eb8ae996da98d)
- [Implementing state machine library](https://kentcdodds.com/blog/implementing-a-simple-state-machine-library-in-javascript)
- [XState visualizer](https://xstate.js.org/viz/)
- [Statecharts: A visual formalism of complex systems](http://www.inf.ed.ac.uk/teaching/courses/seoc/2005_2006/resources/statecharts.pdf)

## Credits

Based on a great [tutorial](https://www.youtube.com/playlist?list=PLfE0DpqEANZ3xfwKRr8y0BbYTcZouQQNz) by [@mkczarkowski](https://github.com/mkczarkowski)
