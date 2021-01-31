export class PostUserDTO {
  id: string;
  constructor(
    userName: string,
    userConfig: UserConfigItem[],
    userKey: string,
  ) {}
}

export class UserConfigItem {
  id: string;
  constructor(defaultIssue: string, defaultComment: string, category: string) {}
}
