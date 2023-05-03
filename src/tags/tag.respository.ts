import { InjectRepository } from "@nestjs/typeorm";
import {Repository } from "typeorm";
import { Tag } from "./tag.entity";

export class TagRepository extends Repository<Tag>{
    constructor(
        @InjectRepository(Tag) 
        private readonly tagRepository: Repository<Tag>){
            super(tagRepository.target, tagRepository.manager, tagRepository.queryRunner);
        }
}