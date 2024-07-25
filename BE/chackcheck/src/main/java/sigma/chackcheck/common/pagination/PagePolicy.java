package sigma.chackcheck.common.pagination;

public enum PagePolicy {
    DEFAULT_PAGE("기본 페이지", 8),
    MAIN_PAGE("메인 페이지", 8);
    public final String pageName;
    public final int pageSize;
    PagePolicy(String pageName, int pageSize){
        this.pageName = pageName;
        this.pageSize = pageSize;
    }
}
