package bootify.hotel_api_test.model;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;

import bootify.hotel_api_test.service.HotelsService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Constraint;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.Map;
import org.springframework.web.servlet.HandlerMapping;


/**
 * Validate that the nameHotel value isn't taken yet.
 */
@Target({ FIELD, METHOD, ANNOTATION_TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(
        validatedBy = HotelsNameHotelUnique.HotelsNameHotelUniqueValidator.class
)
public @interface HotelsNameHotelUnique {

    String message() default "{Exists.hotels.nameHotel}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    class HotelsNameHotelUniqueValidator implements ConstraintValidator<HotelsNameHotelUnique, String> {

        private final HotelsService hotelsService;
        private final HttpServletRequest request;

        public HotelsNameHotelUniqueValidator(final HotelsService hotelsService,
                final HttpServletRequest request) {
            this.hotelsService = hotelsService;
            this.request = request;
        }

        @Override
        public boolean isValid(final String value, final ConstraintValidatorContext cvContext) {
            if (value == null) {
                // no value present
                return true;
            }
            @SuppressWarnings("unchecked") final Map<String, String> pathVariables =
                    ((Map<String, String>)request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE));
            final String currentId = pathVariables.get("idHotel");
            if (currentId != null && value.equalsIgnoreCase(hotelsService.get(Integer.parseInt(currentId)).getNameHotel())) {
                // value hasn't changed
                return true;
            }
            return !hotelsService.nameHotelExists(value);
        }

    }

}
