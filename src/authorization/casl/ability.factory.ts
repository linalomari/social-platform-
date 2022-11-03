import { Injectable } from '@nestjs/common';
import {
  AbilityBuilder,
  AbilityClass,
  createMongoAbility,
  MongoAbility,
  PureAbility,
} from '@casl/ability';
import { Group, Post, User } from '@prisma/client';
import { createPrismaAbility, PrismaQuery, Subjects } from '@casl/prisma';
import { subject } from '@casl/ability/dist/types';

export enum PostActions {
  Create = 'create',
  Read = 'read',
  Edit = 'edit',
  Delete = 'delete',
  Comment = 'comment',
}

export enum GroupActions {
  AddMember = 'add',
  RemoveMember = 'remove',
  Leave = 'leave',
  MakeAdmin = 'make admin',
  Post = 'Post',
  GetPosts='GetPosts',
  Manage = 'manage',
}

type NewType = {
  Post: Post;
  Group: Group;
  all;
};

export type AppAbility = PureAbility<
  [PostActions | GroupActions, Subjects<NewType>],
  PrismaQuery
>;

@Injectable()
export class AbilityFactory {
  // defineAbility(user: User, role: Role, object:NewType) {
  //   switch (role) {
  //     case Role.MEMBER:
  //       return this.defineMemberAbility(user,object);
  //       break
  //     case Role.ADMIN:
  //       return this.defineAdminAbility(user,object);
  //       break
  //     case Role.USER:
  //       return this.defineUserAbility(user,object);
  //   }
  //const abilities = build();
  // can('read', 'Post', { authorId: 1 });
  // cannot('read', 'Post', { title: { startsWith: '[WIP]:' } });

  // const ability = build();
  // ability.can('read', 'Post');
  // ability.can('read', subject('Post', { title: '...', authorId: 1 })));
  // }

  defineAdminGroupAbility(user: User, group: Group) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createPrismaAbility,
    );
    can(GroupActions.Manage, 'all');
    return build();
  }

  defineMemberGroupAbility(user: User, group: Group) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createPrismaAbility,
    );
    can(GroupActions.Leave, 'Group');
    can(GroupActions.Post, 'Group');
    can(GroupActions.GetPosts, 'Group');
    return build();
  }

  defineUserGroupAbility(user: User, group: Group) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createPrismaAbility,
    );
    cannot(GroupActions.Manage, 'all');
    return build();
  }

  defineUserPostAbility(user: User, post: Post) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createPrismaAbility,
    );

    can(PostActions.Read, 'Post', { isPublic: true });
    can(PostActions.Comment, 'Post', { isPublic: true });
    return build();
  }
  defineMemberPostAbility(user: User, post: Post) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createPrismaAbility,
    );

    can(PostActions.Read, 'Post');
    can(PostActions.Edit, 'Post', { userId: user.id });
    can(PostActions.Comment, 'Post');
    can(PostActions.Delete, 'Post', { userId: user.id });
    return build();
  }
  defineAdminPostAbility(user: User, post: Post) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createPrismaAbility,
    );

    can(PostActions.Read, 'Post');
    can(PostActions.Edit, 'Post', { userId: user.id });
    can(PostActions.Comment, 'Post');
    can(PostActions.Delete, 'Post');
    return build();
  }
}
