import { Board } from './board.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { User } from '../auth/user.entity';

@Injectable()
export class BoardsService {
  // inject Repository to Service
  constructor(private boardRepository: BoardRepository) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Can't find ${id}`);
    }
    return found;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't delete ${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }

  // private boards: Board[] = [];

  // getAllBoards(): Board[] {
  // 	return this.boards;
  // }

  // createBoard(createBoardDto: CreateBoardDto): Board {
  // 	const { title, description } = createBoardDto;
  // 	const board: Board = {
  // 		id: uuid(),
  // 		title,
  // 		description,
  // 		status: BoardStatus.PUBLIC,
  // 	}
  // 	this.boards.push(board);
  // 	return board;
  // }

  // getBoardById(id: string): Board {
  // 	return this.boards.find((board) => board.id === id);
  // }

  // deleteBoard(id: string): void {
  // 	const found = this.getBoardById(id);
  // 	this.boards = this.boards.filter((board) => board.id !== found.id);
  // }

  // updateBoardStatus(id:string, status:BoardStatus): Board {
  // 	const Board = this.getBoardById(id);
  // 	Board.status = status;
  // 	return Board;
  // }
}
