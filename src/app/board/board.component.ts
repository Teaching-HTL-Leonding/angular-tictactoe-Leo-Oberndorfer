import {Component, Input} from '@angular/core';
import {SquareComponent} from "../square/square.component";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    SquareComponent
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  st: string = "Player X's turn";
  squares: string[] = [];
  currentPlayer = "X";
  gameOver = false;

  constructor() {
    for(let i = 0; i < 9; i++){
      this.squares.push("");
    }
  }

  handleClick(index: number){
    if(this.gameOver){
      return;
    }
    if(this.squares[index] === ""){
      this.squares[index] = this.currentPlayer;
      if(this.checkWin()){
        this.gameOver = true;
        this.st = `Player ${this.currentPlayer} wins!`;
      } else if(this.checkDraw()){
        this.gameOver = true;
        this.st = "It's a draw!";
      } else {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        this.st = `Player ${this.currentPlayer}'s turn`;
      }
    }
  }

  checkWin(){
    for(let i = 0; i < 9; i++){
      if(this.squares[i] === ""){
        continue;
      }
      if(i % 3 === 0){
        if(this.squares[i] === this.squares[i + 1] && this.squares[i] === this.squares[i + 2]){
          return true;
        }
      }
      if(i < 3){
        if(this.squares[i] === this.squares[i + 3] && this.squares[i] === this.squares[i + 6]){
          return true;
        }
      }
      if(i === 0){
        if(this.squares[i] === this.squares[i + 4] && this.squares[i] === this.squares[i + 8]){
          return true;
        }
      }
      if(i === 2){
        if(this.squares[i] === this.squares[i + 2] && this.squares[i] === this.squares[i + 4]){
          return true;
        }
      }
    }
    return false;
  }

  checkDraw() {
    for(let i = 0; i < 9; i++){
      if(this.squares[i] === ""){
        return false;
      }
    }
    return true;
  }

  reset(){
    for(let i = 0; i < 9; i++){
      this.squares[i] = "";
    }
    this.currentPlayer = "X";
    this.st = "Player X's turn";
    this.gameOver = false;
  }
}
