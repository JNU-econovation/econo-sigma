package sigma.chackcheck.common.util;

import java.util.Arrays;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class CategoryParser {
    public List<String> parseCategory(String categories){
        return Arrays.asList(categories.split(","));
    }
}
