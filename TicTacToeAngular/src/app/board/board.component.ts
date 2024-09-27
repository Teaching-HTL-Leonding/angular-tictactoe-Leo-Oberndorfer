import {Component, Input, signal, WritableSignal} from '@angular/core';

type Player = 'X' | 'O';
type Status = "Player X's turn" | "Player O's turn" | "Player X wins!" | "Player O wins!" | "It's a draw!";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  status: WritableSignal<Status> = signal("Player X's turn");
  squares = signal(Array(9).fill(""));
  currentPlayer: Player = "X";
  gameOver = false;

  handleClick(index: number){
    if(this.gameOver){
      return;
    }
    if(this.squares()[index] === ""){
      this.squares()[index] = this.currentPlayer;
      if(this.checkWin()){
        this.gameOver = true;
        this.status.set(`Player ${this.currentPlayer} wins!`);
      } else if(this.checkDraw()){
        this.gameOver = true;
        this.status.set("It's a draw!");
      } else {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        this.status.set(`Player ${this.currentPlayer}'s turn`);
      }
    }
  }

  checkWin(){
    for(let i = 0; i < 9; i++){
      if(this.squares()[i] === ""){
        continue;
      }
      if(i % 3 === 0){
        if(this.squares()[i] === this.squares()[i + 1] && this.squares()[i] === this.squares()[i + 2]){
          return true;
        }
      }
      if(i < 3){
        if(this.squares()[i] === this.squares()[i + 3] && this.squares()[i] === this.squares()[i + 6]){
          return true;
        }
      }
      if(i === 0){
        if(this.squares()[i] === this.squares()[i + 4] && this.squares()[i] === this.squares()[i + 8]){
          return true;
        }
      }
      if(i === 2){
        if(this.squares()[i] === this.squares()[i + 2] && this.squares()[i] === this.squares()[i + 4]){
          return true;
        }
      }
    }
    return false;
  }

  checkDraw() {
    for(let i = 0; i < 9; i++){
      if(this.squares()[i] === ""){
        return false;
      }
    }
    return true;
  }

  reset(){
    for(let i = 0; i < 9; i++){
      this.squares()[i] = "";
    }
    this.currentPlayer = "X";
    this.status.set("Player X's turn");
    this.gameOver = false;
  }
}
