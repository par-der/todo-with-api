import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as api from './apiUser.ts';
import { setUsernameApi } from './apiUser.ts';

export const useCurrentUserQuery = () => {
  return useQuery({ queryKey: ['current-user'], queryFn: api.getCurrentUser });
};

export const useGetUserInfoQuery = () => {
  return useQuery({
    queryKey: ['user', 'info'],
    queryFn: api.getCurrentUser,
  });
};

export const useUpdateUserMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.updateCurrentUser,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['current-user'] });
      qc.invalidateQueries({ queryKey: ['user', 'info'] });
    },
  });
};

export const useUploadAvatarMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.uploadAvatar,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['current-user'] });
      qc.invalidateQueries({ queryKey: ['user', 'info'] });
    },
  });
};

export const useSetUsernameMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: setUsernameApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['current-user'] });
      qc.invalidateQueries({ queryKey: ['user', 'info'] });
    },
  });
};

export const useChangePasswordMutation = () => useMutation(api.changePassword);
