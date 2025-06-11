import { useQuery } from "@tanstack/react-query";
import { groupService } from "./group.service";
import { GetGroupResponse } from "./group.schema";

export const useGroupQuery = (groupId: string) => {
  return useQuery<GetGroupResponse>({
    queryKey: ["group", groupId],
    queryFn: () => groupService.getGroup(groupId),
  });
};
