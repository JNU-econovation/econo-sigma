package sigma.chackcheck.domain.user.dto.response;

import static lombok.AccessLevel.PROTECTED;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sigma.chackcheck.common.dto.PageInfo;

@Getter
@Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
public class UserPageAdminResponse {
    private PageInfo pageInfo;
    private UserInfos userInfos;
}
